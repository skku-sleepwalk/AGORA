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
  GameStoreReviewLikeRelationRepository,
  GameStoreReviewCommentRepository,
  PlayTimeRelationRepository,
} from './game-store.repository';
import { UserRepository } from 'src/users/user.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import {
  GameStoreBoard,
  GameStoreBoardLikeRelation,
} from './entities/game-store-board.entity';
import { v4 as uuid } from 'uuid';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreTagDto } from './dto/create-game-tag.dto';
import {
  GameStore,
  GameStoreTag,
  PlayTimeRelation,
} from './entities/game-store.entity';
import { cloneDeep } from 'lodash';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CreateGameStoreReviewDto } from './dto/create-game-store-review.dto';
import {
  GameStoreReview,
  GameStoreReviewComment,
  GameStoreReviewLikeRelation,
  LikeAction,
} from './entities/game-store-review.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateGameStoreReviewCommentDto } from './dto/create-game-store-review-comment.dto';
import { UpdatePlaytimeRelationDto } from './dto/update-playtime-relation.dto';

@Injectable()
export class GameStoreService {
  private readonly userRepository: UserRepository;

  private readonly gameStoreRepository: GameStoreRepository;
  private readonly shortDesriptionRepository: ShortDescriptionRepository;
  private readonly snsUrlsRepository: SNSUrlsRepository;
  private readonly costRepository: CostRepository;
  private readonly gameStoreTagRepository: GameStoreTagRepository;
  private readonly playTimeRelationRepository: PlayTimeRelationRepository;

  private readonly gameStoreReviewRepository: GameStoreReviewRepository;
  private readonly gameStoreReviewLikeRelationRepository: GameStoreReviewLikeRelationRepository;
  private readonly gameStoreReviewCommentRepository: GameStoreReviewCommentRepository;

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
    this.playTimeRelationRepository = connection.getCustomRepository(
      PlayTimeRelationRepository,
    );

    this.gameStoreReviewRepository = connection.getCustomRepository(
      GameStoreReviewRepository,
    );
    this.gameStoreReviewLikeRelationRepository = connection.getCustomRepository(
      GameStoreReviewLikeRelationRepository,
    );
    this.gameStoreReviewCommentRepository = connection.getCustomRepository(
      GameStoreReviewCommentRepository,
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
    const { name, tagType } = createGameStoreTagDto;
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
    const newGenre = this.gameStoreTagRepository.create({ name, tagType });
    return this.gameStoreTagRepository.save(newGenre);
  }

  async createPlayTimeRelation(userEmail: string, gameStoreId: string) {
    const user = await this.userRepository.findOne({ email: userEmail });
    const gameStore = await this.gameStoreRepository.findOne(gameStoreId);
    if (await this.playTimeRelationRepository.findOne({ user, gameStore })) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            gameStoreId:
              '해당 user와 gameStore간의 playtimeRelation은 이미 존재합니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newRelation = this.playTimeRelationRepository.create({
      id: uuid(),
      user,
      gameStore,
    });

    return this.playTimeRelationRepository.save(newRelation);
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
    return this.gameStoreReviewRepository.save(newReview);
  }

  async createGameStoreReviewComment(
    writerEmail: string,
    createGameStoreReviewCommentDto: CreateGameStoreReviewCommentDto,
  ) {
    const { reviewId, content } = createGameStoreReviewCommentDto;
    const review = await this.gameStoreReviewRepository.findOne(reviewId);
    const writer = await this.userRepository.findOne({ email: writerEmail });
    const newComment: GameStoreReviewComment =
      this.gameStoreReviewCommentRepository.create({
        id: uuid(),
        content,
        review,
      });
    return this.gameStoreReviewCommentRepository.save(newComment);
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

  async findGameStoreByTag(_cursor: Cursor, tagName: string) {
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

  async findGameStoreReview(_cursor: Cursor, gameStoreId: string) {
    const gameStore = this.getGameStoreWithRelations()
      .where('gamestore.id = :gameStoreId', { gameStoreId })
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

    const queryBuilder: SelectQueryBuilder<GameStoreReview> =
      this.gameStoreReviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.writer', 'writer')
        .leftJoinAndSelect('writer.playtimeRelations', 'playtimeRelations')
        .where('playtimeRelations.gameStore = :gameStoreId', { gameStoreId });

    const paginationOption: PaginationOptions<GameStoreReview> = {
      entity: GameStoreReview,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: null,
        beforeCursor: null,
        limit: 5,
        order: 'DESC',
      },
    };

    paginationOption.query.afterCursor =
      _cursor.afterCursor || paginationOption.query.afterCursor;
    paginationOption.query.beforeCursor =
      _cursor.beforeCursor || paginationOption.query.beforeCursor;

    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('review');
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

  async updateGameStoreLike(gameStoreId: string, userEmail: string) {
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
      gameStore.likeCount += 1;
    } else {
      gameStore.likedUsers = gameStore.likedUsers.filter(
        (likedUser) => likedUser.email !== user.email,
      );
      gameStore.likeCount -= 1;
    }
    gameStore.createdAt = createdAt;

    return this.gameStoreRepository.save(gameStore);
  }

  async updatePlaytimeRelation(
    userEmail: string,
    updatePlaytimeRelation: UpdatePlaytimeRelationDto,
  ) {
    const { gameStoreId, additionalPlayTime } = updatePlaytimeRelation;
    const gameStore: GameStore = await this.gameStoreRepository.findOne(
      gameStoreId,
    );
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
    const user: User = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            userEmail: `Email이 ${userEmail}인 사용자를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    let relation: PlayTimeRelation =
      await this.playTimeRelationRepository.findOne({
        user,
        gameStore,
      });
    if (!relation) {
      relation = await this.createPlayTimeRelation(userEmail, gameStoreId);
    }
    relation.playTime += additionalPlayTime;
    return this.playTimeRelationRepository.save(relation);
  }

  async updateGameStoreReviewLike(
    gameStoreReviewId: string,
    userEmail: string,
    likeAction: LikeAction,
  ) {
    const review: GameStoreReview = await this.gameStoreReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.likeRelation', 'likeRelation')
      .leftJoinAndSelect('likeRelation.user', 'user')
      .where('review.id = :gameStoreReviewId', { gameStoreReviewId })
      .getOne();

    if (!review) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: '해당 ID를 가진 후기가 존재하지 않습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = await this.userRepository.findOne({ email: userEmail });
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

    const relation: GameStoreReviewLikeRelation =
      await this.gameStoreReviewLikeRelationRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.gameStoreReview', 'gameStoreReview')
        .leftJoinAndSelect('relation.user', 'user')
        .where(
          '(gameStoreReview.id = :gameStoreReviewId) AND (user.email = :userEmail)',
          { gameStoreReviewId, userEmail },
        )
        .getOne();

    const createdAt: Date = review.createdAt;

    if (!relation) {
      // 새로운 좋아요, 싫어요 눌렀을 시
      const newRelation = this.gameStoreReviewLikeRelationRepository.create({
        id: uuid(),
        user,
        likeAction,
      });
      this.gameStoreReviewLikeRelationRepository.save(newRelation);
      review.likeRelation.push(newRelation);
      likeAction === 'like'
        ? (review.likeCount += 1)
        : (review.unlikeCount += 1);
    } else if (relation.likeAction === likeAction) {
      // 좋아요, 싫어요 취소 시
      review.likeRelation = review.likeRelation.filter(
        (relation) => relation.user.email !== user.email,
      );
      this.gameStoreReviewLikeRelationRepository.delete(relation);
      likeAction === 'like'
        ? (review.likeCount -= 1)
        : (review.unlikeCount -= 1);
    } else if (relation.likeAction !== likeAction) {
      // 반대거 눌렀을 시
      relation.likeAction = relation.likeAction !== 'like' ? 'like' : 'unlike';
      likeAction === 'like'
        ? ((review.likeCount += 1), (review.unlikeCount -= 1))
        : ((review.likeCount -= 1), (review.unlikeCount += 1));
      this.gameStoreReviewLikeRelationRepository.save(relation);
    }

    review.createdAt = createdAt;
    return this.gameStoreReviewRepository.save(review);
  }

  remove(id: number) {
    return `This action removes a #${id} gameStore`;
  }
}
