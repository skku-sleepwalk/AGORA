import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import {
  CostRepository,
  GameStoreBoardCategoryRepository,
  GameStoreBoardLikeRelationRepository,
  GameStoreBoardRepository,
  GameStoreTagRepository,
  GameStoreRepository,
  SNSUrlsRepository,
  ShortDescriptionRepository,
  GameStoreReviewRepository,
} from './game-store.repository';
import { UserRepository } from 'src/users/user.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { GameStoreBoard } from './entities/game-store-board.entity';
import { v4 as uuid } from 'uuid';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreTagDto } from './dto/create-game-tag.dto';
import { GameStore, GameStoreTag } from './entities/game-store.entity';
import { cloneDeep } from 'lodash';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CreateGameStoreReviewDto } from './dto/create-game-store-review.dto';
import { GameStoreReview } from './entities/game-store-review.entity';

@Injectable()
export class GameStoreService {
  private readonly userRepository: UserRepository;
  private readonly gameStoreRepository: GameStoreRepository;
  private readonly shortDesriptionRepository: ShortDescriptionRepository;
  private readonly snsUrlsRepository: SNSUrlsRepository;
  private readonly costRepository: CostRepository;
  private readonly gameStoreTagRepository: GameStoreTagRepository;
  private readonly gameStoreReviewRepository: GameStoreReviewRepository;
  private readonly gameStoreBoardRepository: GameStoreBoardRepository;
  private readonly gameStoreBoardLikeRelationRepository: GameStoreBoardLikeRelationRepository;
  private readonly gameStoreBoardCategoryRepository: GameStoreBoardCategoryRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
    this.gameStoreRepository =
      connection.getCustomRepository(GameStoreRepository);
    this.shortDesriptionRepository = connection.getCustomRepository(
      ShortDescriptionRepository,
    );
    this.snsUrlsRepository = connection.getCustomRepository(SNSUrlsRepository);
    this.costRepository = connection.getCustomRepository(CostRepository);
    this.gameStoreTagRepository = connection.getCustomRepository(
      GameStoreTagRepository,
    );
    this.gameStoreReviewRepository = connection.getCustomRepository(
      GameStoreReviewRepository,
    );
    this.gameStoreBoardRepository = connection.getCustomRepository(
      GameStoreBoardRepository,
    );
    this.gameStoreBoardCategoryRepository = connection.getCustomRepository(
      GameStoreBoardCategoryRepository,
    );
    this.gameStoreBoardLikeRelationRepository = connection.getCustomRepository(
      GameStoreBoardLikeRelationRepository,
    );
  }

  getGameStoreWithRelations(): SelectQueryBuilder<GameStore> {
    return this.gameStoreRepository
      .createQueryBuilder('gamestore')
      .withDeleted()
      .leftJoinAndSelect('gamestore.author', 'author')
      .leftJoinAndSelect('gamestore.likedUsers', 'likedUsers')
      .leftJoinAndSelect('gamestore.tags', 'tags')
      .leftJoinAndSelect('gamestore.shortDescription', 'shortDescription')
      .leftJoinAndSelect('gamestore.snsUrls', 'snsUrls')
      .leftJoinAndSelect('gamestore.cost', 'cost');
  }

  getBoardWithRelations(): SelectQueryBuilder<GameStoreBoard> {
    return this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .withDeleted()
      .leftJoinAndSelect('board.writer', 'writer')
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categoryTypes', 'categoryTypes');
  }

  private gameStorePaginationOption: PaginationOptions<GameStore> = {
    entity: GameStore,
    paginationKeys: ['createdAt'],
    query: {
      afterCursor: null,
      beforeCursor: null,
      limit: 5,
      order: 'DESC',
    },
  };

  async getParentBoard(parentId: string): Promise<GameStoreBoard> {
    const parent = await this.getBoardWithRelations()
      .where('board.id = :id', { id: parentId })
      .getOne();

    if (!parent) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            parentId: '해당 ID를 가진 부모 게시물이 존재하지 않습니다',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return parent;
  }

  async incrementChildCount(parent: GameStoreBoard): Promise<void> {
    if (!parent) {
      return;
    }

    parent.child += 1;
    await this.gameStoreBoardRepository.save(parent);

    if (parent.parent) {
      const currentParent = await this.getBoardWithRelations()
        .where('board.id = :id', { id: parent.parent.id })
        .getOne();
      await this.incrementChildCount(currentParent);
    }
  }

  async createGameStore(
    authorEmail: string,
    createGameStoreDto: CreateGameStoreDto,
  ) {
    const {
      title,
      description,
      distributor,
      developer,
      snsUrls,
      shortDescription,
      tagNames,
      cost,
    } = createGameStoreDto;

    const author = await this.userRepository.findOne({ email: authorEmail });
    if (!author) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            authorEmail: '작성자를 찾을 수 없습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newGameStore = this.gameStoreRepository.create({
      id: uuid(),
      author,
      title,
      description,
      developer,
      distributor,
      tags: [],
      likedUsers: [],
    });
    newGameStore.shortDescription = await this.shortDesriptionRepository.save(
      this.shortDesriptionRepository.create({
        id: uuid(),
        ...shortDescription,
      }),
    );
    newGameStore.cost = await this.costRepository.save(
      this.costRepository.create({ id: uuid(), ...cost }),
    );
    newGameStore.snsUrls = await this.snsUrlsRepository.save(
      this.snsUrlsRepository.create({ id: uuid(), ...snsUrls }),
    );

    for (const tagName of tagNames) {
      const Tag: GameStoreTag = await this.gameStoreTagRepository.findOne({
        name: tagName,
      });
      if (Tag) {
        newGameStore.tags.push(Tag);
      }
    }

    return this.gameStoreRepository.save(newGameStore);
  }

  async createGameStoreTag(createGameStoreTagDto: CreateGameStoreTagDto) {
    const { name } = createGameStoreTagDto;
    if (await this.gameStoreTagRepository.findOne({ name })) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            name: `name이 ${name}인 태그가 이미 존재합니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newGenre = this.gameStoreTagRepository.create({ name });
    return this.gameStoreTagRepository.save(newGenre);
  }

  async createGameStoreReview(
    writerEmail: string,
    createGameStoreReviewDto: CreateGameStoreReviewDto,
  ) {
    const { gameStoreId, content } = createGameStoreReviewDto;
    const gameStore = await this.gameStoreRepository.findOne(gameStoreId);
    if (!gameStore) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            gameStoreId: '해당 ID를 가진 게임이 존재하지 않습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const writer = await this.userRepository.findOne({ email: writerEmail });
    if (!writer) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            writerEmail: `Email이 ${writerEmail}인 사용자를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newReview: GameStoreReview = this.gameStoreReviewRepository.create({
      id: uuid(),
      writer,
      gameStore,
      content,
    });
  }

  async createGameStoreBoards(
    writerEmail: string,
    createGameStoreBoardsDto: CreateGameStoreBoardDto,
  ) {
    const { title, content, parentId, categoryNames, gameStoreId } =
      createGameStoreBoardsDto;

    const writer = await this.userRepository.findOne({ email: writerEmail });
    if (!writer) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            writerEmail: `이메일이 ${writerEmail}인 사용자를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const gameStore = await this.gameStoreRepository.findOne(gameStoreId);
    if (!gameStore) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            gameStoreId: `ID가 ${gameStoreId}인 게임 스토어를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const parent: GameStoreBoard | null = parentId
      ? await this.getParentBoard(parentId)
      : null;
    await this.incrementChildCount(parent);

    const newBoard = this.gameStoreBoardRepository.create({
      id: uuid(),
      title,
      content,
      writer,
      parent,
      categoryTypes: [],
      gameStore,
    });

    for (const categoryName of categoryNames) {
      const categoryType = await this.gameStoreBoardCategoryRepository.findOne({
        name: categoryName,
      });
      if (categoryType) {
        newBoard.categoryTypes.push(categoryType);
      }
    }

    return this.gameStoreBoardRepository.save(newBoard);
  }

  createGameStoreBoardCategory(
    createGameStoreBoardCategoryDto: CreateGameStoreBoardCategoryDto,
  ) {
    const { name } = createGameStoreBoardCategoryDto;
    const newCategory = this.gameStoreBoardCategoryRepository.create({ name });
    return this.gameStoreBoardCategoryRepository.save(newCategory);
  }

  async getGameStoreByTag(_cursor: Cursor, tagName: string) {
    const tag = this.gameStoreTagRepository.findOne({ name: tagName });
    if (!tag) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            tagName: `name이 ${tagName}인 태그를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryBuilder = this.gameStoreRepository
      .createQueryBuilder('gamestore')
      .leftJoinAndSelect('gamestore.shortDescription', 'shortDescription')
      .leftJoinAndSelect('gamestore.tags', 'tags')
      .where('tags.name = :tagName', { tagName });

    const paginationOption: PaginationOptions<GameStore> = cloneDeep(
      this.gameStorePaginationOption,
    );
    paginationOption.query.afterCursor =
      _cursor.afterCursor || paginationOption.query.afterCursor;
    paginationOption.query.beforeCursor =
      _cursor.beforeCursor || paginationOption.query.beforeCursor;
    const paginator = buildPaginator(paginationOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  findAll() {
    return `This action returns all gameStore`;
  }

  findOneGameStore(id: string) {
    const queryBuilder: SelectQueryBuilder<GameStore> =
      this.getGameStoreWithRelations();
    const gameStore = queryBuilder.where('gameStore.id = :id', { id }).getOne();

    if (!gameStore) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            gameStoreId: '해당 ID를 가진 게임이 존재하지 않습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return gameStore;
  }

  update(id: number, updateGameStoreDto: UpdateGameStoreDto) {
    return `This action updates a #${id} gameStore`;
  }

  async gameStoreLikeUpdate(gameStoreId: string, userEmail: string) {
    const queryBuilder: SelectQueryBuilder<GameStore> =
      this.getGameStoreWithRelations();

    const gameStore = await queryBuilder
      .where('gamestore.id =:gameStoreId', { gameStoreId })
      .getOne();

    if (!gameStore) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            gameStoreId: '해당 ID를 가진 게임이 존재하지 않습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdAt = cloneDeep(gameStore.createdAt);
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            userEamil: `Email이 ${userEmail}인 사용자를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!gameStore.likedUsers.map((user) => user.email).includes(user.email)) {
      gameStore.likedUsers.push(user);
      gameStore.like += 1;
    } else {
      gameStore.likedUsers = gameStore.likedUsers.filter(
        (likedUser) => likedUser.email !== user.email,
      );
      gameStore.like -= 1;
    }
    gameStore.createdAt = createdAt;

    return this.gameStoreRepository.save(gameStore);
  }

  remove(id: number) {
    return `This action removes a #${id} gameStore`;
  }
}
