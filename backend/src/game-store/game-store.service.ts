import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import {
  CostRepository,
  GameStoreBoardCategoryRepository,
  GameStoreBoardLikeRelationRepository,
  GameStoreBoardRepository,
  GameStoreGenreRepository,
  GameStoreRepository,
  SNSUrlsRepository,
  ShortDescriptionRepository,
  GameStoreReviewRepository,
  GameStoreReviewLikeRelationRepository,
  GameStoreReviewCommentRepository,
  PlayTimeRelationRepository,
  GameStoreReviewCommentLikeRelationRepository,
  GameStoreTagRepository,
  GameStoreTagRelationRepository,
} from './game-store.repository';
import {
  GameStoreShoppingCartItemRepository,
  UserRepository,
} from 'src/users/user.repository';
import { Connection, In, SelectQueryBuilder, getManager } from 'typeorm';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import {
  GameStoreBoard,
  GameStoreBoardLikeRelation,
} from './entities/game-store-board.entity';
import { v4 as uuid } from 'uuid';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';

import {
  GameStore,
  GameStoreGenre,
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
  GameStoreReviewCommentLikeRelation,
  GameStoreReviewLikeRelation,
  LikeAction,
} from './entities/game-store-review.entity';
import {
  GameStoreShoppingCartItem,
  User,
} from 'src/users/entities/user.entity';
import { CreateGameStoreReviewCommentDto } from './dto/create-game-store-review-comment.dto';
import { UpdatePlaytimeRelationDto } from './dto/update-playtime-relation.dto';
import { UpdateGameStoreReviewDto } from './dto/update-game-store-review.dto';
import { UpdateGameStoreReviewCommentDto } from './dto/update-game-store-review-comment.dto';
import { UpdateGameStoreBoardDto } from './dto/update-game-store-board.dto';
import { CreateGameStoreGenreDto } from './dto/create-game-store-genre.dto';
import { CreateGameStoreTagDto } from './dto/create-game-store-tag.dto';
import { CreateGameStoreTagRelationDto } from './dto/create-game-store-tag-relation.dto';
import { CreatePlaytimeRelationDto } from './dto/create-playtime-relation.dto';
import { CreateGameStoreShoppingCartItemDto } from './dto/create-game-store-shoppingCartItem.dto';
import { UpdateGameStoreShoppingCartItemDto } from './dto/update-game-store-shoppingCartItem.dto';

@Injectable()
export class GameStoreService {
  private readonly userRepository: UserRepository;

  private readonly gameStoreRepository: GameStoreRepository;
  private readonly shortDescriptionRepository: ShortDescriptionRepository;
  private readonly snsUrlsRepository: SNSUrlsRepository;
  private readonly costRepository: CostRepository;
  private readonly gameStoreGenreRepository: GameStoreGenreRepository;
  private readonly gameStoreTagRepository: GameStoreTagRepository;
  private readonly gameStoreTagRelationRepository: GameStoreTagRelationRepository;
  private readonly playTimeRelationRepository: PlayTimeRelationRepository;
  private readonly gameStoreShoppingCartItemRepository: GameStoreShoppingCartItemRepository;

  private readonly gameStoreReviewRepository: GameStoreReviewRepository;
  private readonly gameStoreReviewLikeRelationRepository: GameStoreReviewLikeRelationRepository;
  private readonly gameStoreReviewCommentRepository: GameStoreReviewCommentRepository;
  private readonly gameStoreReviewCommentLikeRelationRepository: GameStoreReviewCommentLikeRelationRepository;

  private readonly gameStoreBoardRepository: GameStoreBoardRepository;
  private readonly gameStoreBoardLikeRelationRepository: GameStoreBoardLikeRelationRepository;
  private readonly gameStoreBoardCategoryRepository: GameStoreBoardCategoryRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);

    this.gameStoreRepository =
      connection.getCustomRepository(GameStoreRepository);
    this.shortDescriptionRepository = connection.getCustomRepository(
      ShortDescriptionRepository,
    );
    this.snsUrlsRepository = connection.getCustomRepository(SNSUrlsRepository);
    this.costRepository = connection.getCustomRepository(CostRepository);
    this.gameStoreGenreRepository = connection.getCustomRepository(
      GameStoreGenreRepository,
    );
    this.gameStoreTagRepository = connection.getCustomRepository(
      GameStoreTagRepository,
    );
    this.gameStoreTagRelationRepository = connection.getCustomRepository(
      GameStoreTagRelationRepository,
    );
    this.playTimeRelationRepository = connection.getCustomRepository(
      PlayTimeRelationRepository,
    );
    this.gameStoreShoppingCartItemRepository = connection.getCustomRepository(
      GameStoreShoppingCartItemRepository,
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
    this.gameStoreReviewCommentLikeRelationRepository =
      connection.getCustomRepository(
        GameStoreReviewCommentLikeRelationRepository,
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
      .leftJoinAndSelect('gamestore.popularTags', 'popularTags')
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

  async updatePopularTags(gameStoreId: string): Promise<GameStore> {
    // 게임 스토어를 찾습니다.
    const gameStore = await this.gameStoreRepository.findOne(gameStoreId, {
      relations: [
        'gameStoreTagRelations',
        'gameStoreTagRelations.tag',
        'popularTags',
      ],
    });

    if (!gameStore) {
      throw new HttpException(
        {
          message: '해당 ID를 가진 게임이 존재하지 않습니다.',
          error: {
            gameStoreId,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 모든 태그 관계와 해당 태그들을 가져옵니다.
    const allRelations = gameStore.gameStoreTagRelations;
    const allTags = allRelations.map((relation) => relation.tag);

    // 태그별 관계 개수를 세기 위해 맵을 사용합니다.
    const tagCountMap = new Map<string, number>();

    // 모든 관계를 순회하며 태그별 관계 개수를 셉니다.
    for (const relation of allRelations) {
      const tagName = relation.tag.name;
      tagCountMap.set(tagName, (tagCountMap.get(tagName) || 0) + 1);
    }

    // 태그별 관계 개수를 기준으로 내림차순으로 정렬합니다.
    const sortedTags = allTags.sort((tagA, tagB) => {
      const countA = tagCountMap.get(tagA.name) || 0;
      const countB = tagCountMap.get(tagB.name) || 0;
      return countB - countA;
    });

    // 상위 3개의 태그를 추출하여 리턴합니다.
    const popularTags = sortedTags.slice(0, 3).map((tag) => tag.name);
    gameStore.popularTags.push(
      ...(await this.gameStoreTagRepository.find({
        name: In(popularTags),
      })),
    );

    return await this.gameStoreRepository.save(gameStore);
  }

  // 총 재생 시간 계산 메서드 추가
  async calculateTotalPlaytime(user: User): Promise<number> {
    const relations = await this.playTimeRelationRepository.find({
      where: { user },
    });
    return relations.reduce((total, relation) => total + relation.playTime, 0);
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
      genreNames,
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
      genres: [],
      likedUsers: [],
      price: cost.isFree
        ? 0
        : !cost.isSale
        ? cost.defaultPrice
        : cost.saledPrice,
      popularTags: [],
    });
    newGameStore.shortDescription = await this.shortDescriptionRepository.save(
      this.shortDescriptionRepository.create({
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

    for (const genreName of genreNames) {
      const genre: GameStoreGenre = await this.gameStoreGenreRepository.findOne(
        {
          name: genreName,
        },
      );
      if (genre) {
        newGameStore.genres.push(genre);
      }
    }

    return this.gameStoreRepository.save(newGameStore);
  }

  async createGameStoreGenre(createGameStoreGenreDto: CreateGameStoreGenreDto) {
    const { name } = createGameStoreGenreDto;
    if (await this.gameStoreGenreRepository.findOne({ name })) {
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
    const newGenre = this.gameStoreGenreRepository.create({ id: uuid(), name });
    return this.gameStoreGenreRepository.save(newGenre);
  }

  async createGameStoreTag(createGameStoreTagDto: CreateGameStoreTagDto) {
    const { name } = createGameStoreTagDto;
    const newTag = this.gameStoreTagRepository.create({
      id: uuid(),
      name,
      relations: [],
    });
    return this.gameStoreTagRepository.save(newTag);
  }

  async createGameStoreTagRelation(
    userEmail: string,
    createGameStoreTagRelationDto: CreateGameStoreTagRelationDto,
  ) {
    const { id, tagNames } = createGameStoreTagRelationDto;
    const user = await this.userRepository.findOne({ email: userEmail });
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

    const gameStore = await this.gameStoreRepository.findOne(id);

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

    const tags = await this.gameStoreTagRepository.find({
      where: { name: In(tagNames) },
    });

    const existingRelations = await this.gameStoreTagRelationRepository.find({
      relations: ['gameStore', 'user', 'tag'],
      where: {
        gameStore: { id: gameStore.id },
        user: { email: userEmail },
      },
    });

    const existingTags = existingRelations.map((relation) => relation.tag.name);
    // 추가, 삭제, 유지할 관계들을 담을 배열
    const toAddRelations = [];
    const toDeleteRelations = [];
    const toKeepRelations = [];

    for (const tag of tags) {
      if (!existingTags.includes(tag.name)) {
        // 새로 추가할 관계들
        const newRelation = this.gameStoreTagRelationRepository.create({
          id: uuid(),
          user,
          tag,
          gameStore,
        });
        toAddRelations.push(newRelation);
      } else {
        // 유지할 관계들
        const existingRelation = existingRelations.find(
          (relation) => relation.tag.name === tag.name,
        );
        toKeepRelations.push(existingRelation);
      }
    }

    for (const existingRelation of existingRelations) {
      if (!tags.map((tag) => tag.name).includes(existingRelation.tag.name)) {
        // 삭제할 관계들
        toDeleteRelations.push(existingRelation);
      }
    }

    // 트랜잭션 내에서 추가, 삭제, 유지 작업 실행
    await getManager().transaction(async (transactionalEntityManager) => {
      if (toAddRelations.length > 0) {
        await transactionalEntityManager.save(toAddRelations);
      }

      if (toDeleteRelations.length > 0) {
        await transactionalEntityManager.remove(toDeleteRelations);
      }
    });

    // 추가한 관계들을 유지한 관계들과 합쳐서 리턴
    const updatedRelations = [...toKeepRelations, ...toAddRelations];

    await this.updatePopularTags(gameStore.id);

    return updatedRelations;
  }

  async createPlayTimeRelation(
    userEmail: string,
    createPlaytimeRelationDto: CreatePlaytimeRelationDto,
  ) {
    const { gameStoreId } = createPlaytimeRelationDto;
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
    const user = await this.userRepository.findOne({ email: userEmail });
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

  async createGameStoreShoppingCartItem(
    userEmail: string,
    createGameStoreShoppingCartItemDto: CreateGameStoreShoppingCartItemDto,
  ) {
    const { gameStoreId } = createGameStoreShoppingCartItemDto;
    const user = await this.userRepository.findOne({ email: userEmail });
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
    const newShoppingCartItem: GameStoreShoppingCartItem =
      this.gameStoreShoppingCartItemRepository.create({
        id: uuid(),
        user,
        gameStore,
      });
    const _user = await this.userRepository.findOne({
      relations: ['gameStoreShoppingCartItems'],
      where: { email: userEmail },
    });
    _user.gameStoreShoppingCartItems.push(newShoppingCartItem);
    await this.userRepository.save(_user);
    return this.gameStoreShoppingCartItemRepository.save(newShoppingCartItem);
  }

  async createGameStoreReview(
    writerEmail: string,
    createGameStoreReviewDto: CreateGameStoreReviewDto,
  ) {
    const { gameStoreId, content, rating } = createGameStoreReviewDto;
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
    const reviews = await this.gameStoreReviewRepository.find({
      gameStore: gameStore,
    });

    gameStore.rating = parseFloat(
      (
        (reviews.reduce((sum, review) => sum + review.rating, 0) + rating) /
        (reviews.length + 1)
      ).toFixed(1),
    );

    await this.gameStoreRepository.save(gameStore);
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
      rating,
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
        writer,
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

  async findGameStoreByGenre(_cursor: Cursor, genreName: string) {
    const genre = this.gameStoreGenreRepository.findOne({ name: genreName });
    if (!genre) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            genreName: `name이 ${genreName}인 장르를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryBuilder = this.gameStoreRepository
      .createQueryBuilder('gamestore')
      .leftJoinAndSelect('gamestore.shortDescription', 'shortDescription')
      .leftJoinAndSelect('gamestore.genres', 'genres')
      .leftJoinAndSelect('gamestore.popularTags', 'popularTags')
      .leftJoinAndSelect('gamestore.likedUsers', 'likedUsers')
      .where('genres.name = :genreName', { genreName });

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

  async searchGameStore(
    _cursor: Cursor,
    search: string,
    genreNames: Array<string>,
  ) {
    const queryBuilder = this.gameStoreRepository
      .createQueryBuilder('gameStore')
      .leftJoinAndSelect('gameStore.shortDescription', 'shortDescription')
      .leftJoinAndSelect('gameStore.likedUsers', 'likedUsers')
      .leftJoinAndSelect('gameStore.cost', 'cost')
      .leftJoinAndSelect('gameStore.genres', 'genres')
      .where(
        '(genres.name IN (:...genreNames)) AND (gameStore.title LIKE :search OR gameStore.description LIKE :search OR shortDescription.content LIKE :search)',
        { genreNames, search: `%${search}%` },
      );
    const paginationOption: PaginationOptions<GameStore> = {
      entity: GameStore,
      paginationKeys: ['likeCount'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('gameStore');
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  async searchGameStoreTag(_cursor: Cursor, search: string) {
    const queryBuilder = this.gameStoreTagRepository
      .createQueryBuilder('tag')
      .where('tag.name LIKE :search', { search: `%${search}%` });
    const paginationOption: PaginationOptions<GameStoreTag> = {
      entity: GameStoreTag,
      paginationKeys: ['name'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'ASC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('tag');
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
        .leftJoinAndSelect('review.gameStore', 'gameStore')
        .where('gameStore.id = :gameStoreId', { gameStoreId });

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

  async updateGameStore(
    userEmail: string,
    gameStoreId: string,
    updateGameStoreDto: UpdateGameStoreDto,
  ) {
    const {
      title,
      description,
      distributor,
      developer,
      snsUrls,
      cost,
      shortDescription,
    } = updateGameStoreDto;

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

    const gameStore: GameStore = await this.getGameStoreWithRelations()
      .where('gamestore.id = :id', { id: gameStoreId })
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

    if (user.id !== gameStore.author.id) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            userEmail: `${userEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    gameStore.title = title;
    gameStore.description = description;
    gameStore.distributor = distributor;
    gameStore.developer = developer;

    for (const key in gameStore.snsUrls) {
      if (!Object.keys(snsUrls).includes(key) && key !== 'id') {
        snsUrls[key] = null;
      }
      if (key !== 'id') {
        gameStore.snsUrls[key] = snsUrls[key];
      }
    }
    await this.snsUrlsRepository.update(
      gameStore.snsUrls.id,
      gameStore.snsUrls,
    );

    gameStore.price = cost.isFree
      ? 0
      : !cost.isSale
      ? cost.defaultPrice
      : cost.saledPrice;
    for (const key in gameStore.cost) {
      if (!Object.keys(cost).includes(key) && key !== 'id') {
        cost[key] = null;
      }
      if (key !== 'id') {
        gameStore.cost[key] = cost[key];
      }
    }

    await this.costRepository.update(gameStore.cost.id, gameStore.cost);

    gameStore.shortDescription.content = shortDescription.content;
    gameStore.shortDescription.imageUrl = shortDescription.imageUrl;
    await this.shortDescriptionRepository.update(
      gameStore.shortDescription.id,
      gameStore.shortDescription,
    );
    this.shortDescriptionRepository.findOne(gameStore.shortDescription.id);
    return await this.gameStoreRepository.save(gameStore);
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
    const { gameStoreId, additionalPlaytime } = updatePlaytimeRelation;
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
      relation = await this.createPlayTimeRelation(userEmail, { gameStoreId });
    }
    relation.playTime += additionalPlaytime;
    if (user.totalPlaytime) {
      user.totalPlaytime = 0;
    }

    user.totalPlaytime =
      (await this.calculateTotalPlaytime(user)) + additionalPlaytime;
    await this.userRepository.save(user); // user 저장 추가
    return this.playTimeRelationRepository.save(relation);
  }

  async updateGameStoreShoppingCartItem(
    userEmail: string,
    updateGameStoreShoppingCartItemDto: UpdateGameStoreShoppingCartItemDto,
  ) {
    const { gameStoreId } = updateGameStoreShoppingCartItemDto;
    const user = await this.userRepository.findOne({ email: userEmail });
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

    const shoppingCartItem: GameStoreShoppingCartItem =
      await this.gameStoreShoppingCartItemRepository.findOne({
        user,
        gameStore,
      });

    if (shoppingCartItem) {
      this.gameStoreShoppingCartItemRepository.delete(shoppingCartItem);
    } else {
      this.createGameStoreShoppingCartItem(userEmail, { gameStoreId });
    }
  }

  async updateGameStoreReview(
    userEmail: string,
    gameStoreReviewId: string,
    updateGameStoreReviewDto: UpdateGameStoreReviewDto,
  ) {
    const { content, rating } = updateGameStoreReviewDto;
    const queryBuilder = this.gameStoreReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.writer', 'writer')
      .leftJoinAndSelect('review.gameStore', 'gameStore');
    const review: GameStoreReview = await queryBuilder
      .where('review.id = :id', { id: gameStoreReviewId })
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
    if (user.id !== review.writer.id) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            userEmail: `${userEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    review.content = content;
    review.rating = rating;
    const reviews = await queryBuilder
      .where('(gameStore.id = :gameStoreId) AND (review.id <> :reviewId)', {
        gameStoreId: review.gameStore.id,
        reviewId: review.id,
      })
      .getMany();

    review.gameStore.rating = parseFloat(
      (
        (reviews.reduce((sum, review) => sum + review.rating, 0) + rating) /
        (reviews.length + 1)
      ).toFixed(1),
    );

    await this.gameStoreRepository.update(
      review.gameStore.id,
      review.gameStore,
    );

    return this.gameStoreReviewRepository.save(review);
  }

  async updateGameStoreReviewLike(
    gameStoreReviewId: string,
    userEmail: string,
    likeAction: LikeAction,
  ) {
    const review: GameStoreReview = await this.gameStoreReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.likeRelations', 'likeRelations')
      .leftJoinAndSelect('likeRelations.user', 'user')
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

    let relation: GameStoreReviewLikeRelation =
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
      review.likeRelations.push(
        (relation = await this.gameStoreReviewLikeRelationRepository.save(
          this.gameStoreReviewLikeRelationRepository.create({
            id: uuid(),
            user,
            likeAction,
          }),
        )),
      );
      likeAction === 'like'
        ? (review.likeCount += 1)
        : (review.unlikeCount += 1);
    } else if (!relation.likeAction) {
      relation.likeAction = likeAction;
      review.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = likeAction;
      likeAction === 'like'
        ? (review.likeCount += 1)
        : (review.unlikeCount += 1);
    } else if (relation.likeAction === likeAction) {
      relation.likeAction = null;
      review.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = null;
      likeAction === 'like'
        ? (review.likeCount -= 1)
        : (review.unlikeCount -= 1);
    } else if (relation.likeAction !== likeAction) {
      relation.likeAction = likeAction;
      review.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = likeAction;
      likeAction === 'like'
        ? ((review.likeCount += 1), (review.unlikeCount -= 1))
        : ((review.likeCount -= 1), (review.unlikeCount += 1));
    }

    review.createdAt = createdAt;
    await this.gameStoreReviewLikeRelationRepository.save(relation);
    return await this.gameStoreReviewRepository.save(review);
  }

  async updateGameStoreReviewComment(
    userEmail: string,
    gameStoreReviewCommentId: string,
    updateGameStoreReviewCommentDto: UpdateGameStoreReviewCommentDto,
  ) {
    const { content } = updateGameStoreReviewCommentDto;
    const queryBuilder = this.gameStoreReviewCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.writer', 'writer');
    const comment: GameStoreReviewComment = await queryBuilder
      .where('comment.id = :id', { id: gameStoreReviewCommentId })
      .getOne();

    if (!comment) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: '해당 ID를 가진 후기 댓글이 존재하지 않습니다.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = await this.userRepository.findOne({ email: userEmail });
    if (user.id !== comment.writer.id) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            userEmail: `${userEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    comment.content = content;

    return this.gameStoreReviewCommentRepository.save(comment);
  }

  async updateGameStoreReviewCommentLike(
    gameStoreReviewCommentId: string,
    userEmail: string,
    likeAction: LikeAction,
  ) {
    const comment: GameStoreReviewComment =
      await this.gameStoreReviewCommentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.writer', 'writer')
        .leftJoinAndSelect('comment.likeRelations', 'likeRelations')
        .leftJoinAndSelect('likeRelations.user', 'user')
        .where('comment.id = :gameStoreReviewCommentId')
        .setParameters({ gameStoreReviewCommentId })
        .getOne();

    if (!comment) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: '해당 ID를 가진 후기 댓글이 존재하지 않습니다.',
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

    let relation: GameStoreReviewCommentLikeRelation =
      await this.gameStoreReviewCommentLikeRelationRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.comment', 'comment')
        .leftJoinAndSelect('relation.user', 'user')
        .where(
          '(comment.id = :gameStoreReviewCommentId) AND (user.email = :userEmail)',
          { gameStoreReviewCommentId, userEmail },
        )
        .getOne();

    const createdAt: Date = comment.createdAt;

    if (!relation) {
      comment.likeRelations.push(
        (relation =
          await this.gameStoreReviewCommentLikeRelationRepository.save(
            this.gameStoreReviewCommentLikeRelationRepository.create({
              id: uuid(),
              user,
              likeAction,
            }),
          )),
      );
      likeAction === 'like'
        ? (comment.likeCount += 1)
        : (comment.unlikeCount += 1);
    } else if (!relation.likeAction) {
      relation.likeAction = likeAction;
      comment.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = likeAction;
      likeAction === 'like'
        ? (comment.likeCount += 1)
        : (comment.unlikeCount += 1);
    } else if (relation.likeAction === likeAction) {
      relation.likeAction = null;
      comment.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = null;
      likeAction === 'like'
        ? (comment.likeCount -= 1)
        : (comment.unlikeCount -= 1);
    } else if (relation.likeAction !== likeAction) {
      relation.likeAction = likeAction;
      comment.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = likeAction;
      likeAction === 'like'
        ? ((comment.likeCount += 1), (comment.unlikeCount -= 1))
        : ((comment.likeCount -= 1), (comment.unlikeCount += 1));
    }

    comment.createdAt = createdAt;
    await this.gameStoreReviewCommentLikeRelationRepository.save(relation);
    return await this.gameStoreReviewCommentRepository.save(comment);
  }

  async updateGameStoreBoard(
    userEmail: string,
    gameStoreBoardId: string,
    updateGameStoreBoardDto: UpdateGameStoreBoardDto,
  ) {
    const board = await this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.writer', 'writer')
      .where('board.id = :gameStoreBoardId', { gameStoreBoardId })
      .getOne();
    if (!board) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: `ID가 ${gameStoreBoardId}인 게시물을 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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

    if (userEmail !== board.writer.email) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            writerEmail: `${userEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdAt = cloneDeep(board.createdAt);

    const { title, content, categoryNames } = updateGameStoreBoardDto;
    board.title = title;
    board.content = content;
    board.categoryTypes = [];
    board.createdAt = createdAt;
    for (const categoryName of categoryNames) {
      const categoryType = await this.gameStoreBoardCategoryRepository.findOne({
        name: categoryName,
      });
      if (categoryType) {
        board.categoryTypes.push(categoryType);
      }
    }
    return await this.gameStoreBoardRepository.save(board);
  }

  async updateGameStoreBoardLike(gameStoreBoardId: string, userEmail: string) {
    const board: GameStoreBoard = await this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.likeRelations', 'likeRelations')
      .leftJoinAndSelect('likeRelations.user', 'user')
      .where('board.id = :gameStoreBoardId', { gameStoreBoardId })
      .getOne();

    if (!board) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: '해당 ID를 가진 게시글이 존재하지 않습니다.',
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

    let relation: GameStoreBoardLikeRelation =
      await this.gameStoreBoardLikeRelationRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.gameStoreBoard', 'gameStoreBoard')
        .leftJoinAndSelect('relation.user', 'user')
        .where(
          '(gameStoreBoard.id = :gameStoreBoardId) AND (user.email = :userEmail)',
          { gameStoreBoardId, userEmail },
        )
        .getOne();

    const createdAt: Date = board.createdAt;

    if (!relation) {
      board.likeRelations.push(
        (relation = await this.gameStoreBoardLikeRelationRepository.save(
          this.gameStoreBoardLikeRelationRepository.create({
            id: uuid(),
            user,
            likeAction: 'like',
            gameStoreBoard: board,
          }),
        )),
      );
      board.likeCount += 1;
    } else if (relation.likeAction === null) {
      board.likeCount += 1;
      board.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = 'like';
      relation.likeAction = 'like';
    } else if (relation.likeAction === 'like') {
      relation.likeAction = null;
      board.likeCount -= 1;
      board.likeRelations.filter(
        (relation) => relation.id === relation.id,
      )[0].likeAction = null;
    }

    board.createdAt = createdAt;
    await this.gameStoreBoardLikeRelationRepository.save(relation);
    return await this.gameStoreBoardRepository.save(board);
  }

  async removeGameStore(userEmail: string, id: string) {
    const gameStore: GameStore = await this.gameStoreRepository.findOne({
      relations: [
        'author',
        'cost',
        'shortDescription',
        'snsUrls',
        'gameStoreReviews',
        'gameStoreBoards',
        'shoppingCartItems',
        'gameStoreReviews.comments',
        'playtimeRelations',
      ],
      where: { id },
    });

    if (!gameStore) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: `ID가 ${id}인 게임 스토어를 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (gameStore.author.email !== userEmail) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            writerEmail: `${userEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // GameStoreReviewLikeRelation 삭제
    for (const review of gameStore.gameStoreReviews) {
      await this.gameStoreReviewLikeRelationRepository.delete({
        gameStoreReview: review,
      });
    }

    // GameStoreReviewCommentLikeRelation 삭제
    for (const review of gameStore.gameStoreReviews) {
      for (const comment of review.comments) {
        await this.gameStoreReviewCommentLikeRelationRepository.delete({
          comment,
        });
      }
    }

    // GameStoreReviewComment 삭제
    for (const review of gameStore.gameStoreReviews) {
      await this.gameStoreReviewCommentRepository.delete({
        review,
      });
    }

    await this.playTimeRelationRepository.delete({ gameStore: gameStore });

    // GameStore 삭제
    await this.gameStoreRepository.delete(gameStore.id);
  }

  async removeGameStoreBoard(userEmail: string, id: string) {
    const board = await this.gameStoreBoardRepository.findOne({
      relations: ['parent', 'writer'],
      where: { id },
    });

    if (!board) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            id: `ID가 ${id}인 게시물을 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const parentIdsToUpdate: string[] = [];

    let currentParent = board.parent;
    while (currentParent) {
      parentIdsToUpdate.push(currentParent.id);
      if (!currentParent.parent) {
        break;
      }
      currentParent = currentParent.parent;
    }
    // 부모 게시판들의 child 속성 일괄 업데이트
    await this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .update(GameStoreBoard)
      .set({ child: () => 'child - 1' })
      .where('board.id IN (:...ids)', { ids: parentIdsToUpdate })
      .execute();
    const children: Array<GameStoreBoard> = await this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .where('board.parent.id = :id', { id })
      .getMany();

    if (children.length !== 0) {
      // 자식 게시판들 있는경우 soft delete
      await this.gameStoreBoardRepository.softDelete(id);
    } else {
      // 자식 게시판이 없을 경우 hard delete
      await this.gameStoreBoardRepository.delete(id);
    }
  }
}
