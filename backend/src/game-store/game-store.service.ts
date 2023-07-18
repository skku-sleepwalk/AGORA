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
} from './game-store.repository';
import { UserRepository } from 'src/users/user.repository';
import { Connection, SelectQueryBuilder, getRepository } from 'typeorm';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { GameStoreBoard } from './entities/game-store-board.entity';
import { v4 as uuid } from 'uuid';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreGenreDto } from './dto/create-game-genre.dto';
import {
  GameStore,
  GameStoreGenre,
  SNSUrls,
} from './entities/game-store.entity';
import { cloneDeep } from 'lodash';

@Injectable()
export class GameStoreService {
  private readonly userRepository: UserRepository;
  private readonly gameStoreRepository: GameStoreRepository;
  private readonly shortDesriptionRepository: ShortDescriptionRepository;
  private readonly snsUrlsRepository: SNSUrlsRepository;
  private readonly costRepository: CostRepository;
  private readonly gameStoreGenereRepository: GameStoreGenreRepository;
  private readonly gameStoreBoardRepository: GameStoreBoardRepository;
  private readonly gameStoreBoardLikeRelationRepository: GameStoreBoardLikeRelationRepository;
  private readonly gameStoreBoardCategoryRepository: GameStoreBoardCategoryRepository;
  constructor(private readonly connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
    this.gameStoreRepository =
      connection.getCustomRepository(GameStoreRepository);
    this.gameStoreBoardRepository = connection.getCustomRepository(
      GameStoreBoardRepository,
    );
    this.shortDesriptionRepository = connection.getCustomRepository(
      ShortDescriptionRepository,
    );
    this.snsUrlsRepository = connection.getCustomRepository(SNSUrlsRepository);
    this.costRepository = connection.getCustomRepository(CostRepository);
    this.gameStoreGenereRepository = connection.getCustomRepository(
      GameStoreGenreRepository,
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
      .createQueryBuilder('gameStore')
      .withDeleted()
      .leftJoinAndSelect('gameStore.author', 'author')
      .leftJoinAndSelect('gameStore.likedUsers', 'likedUsers')
      .leftJoinAndSelect('gameStore.genres', 'genres')
      .leftJoinAndSelect('gameStore.shortDescription', 'shortDescription')
      .leftJoinAndSelect('gameStore.snsUrls', 'snsUrls')
      .leftJoinAndSelect('gameStore.cost', 'cost');
  }

  getBoardWithRelations(): SelectQueryBuilder<GameStoreBoard> {
    return this.gameStoreBoardRepository
      .createQueryBuilder('board')
      .withDeleted()
      .leftJoinAndSelect('board.writer', 'writer')
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categoryTypes', 'categoryTypes');
  }

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
      genreNames,
      cost,
    } = createGameStoreDto;

    const author = await this.userRepository.findOne({ email: authorEmail });
    const newGameStore = this.gameStoreRepository.create({
      id: uuid(),
      title,
      description,
      shortDescription,
      developer,
      distributor,
      genres: [],
      author,
      cost,
      snsUrls,
      likedUsers: [],
    });

    for (const genreName of genreNames) {
      const genre: GameStoreGenre =
        await this.gameStoreGenereRepository.findOne({ name: genreName });
      if (genre) {
        newGameStore.genres.push(genre);
      }
    }

    return this.gameStoreRepository.save(newGameStore);
  }

  createGameStoreGenre(createGameStoreGenreDto: CreateGameStoreGenreDto) {
    const { name } = createGameStoreGenreDto;
    const newGenre = this.gameStoreGenereRepository.create({ name });
    return this.gameStoreGenereRepository.save(newGenre);
  }

  async createGameStoreBoards(
    writerEmail: string,
    createGameStoreBoardsDto: CreateGameStoreBoardDto,
  ) {
    const { title, content, parentId, categoryNames, gameStoreId } =
      createGameStoreBoardsDto;

    const writer = await this.userRepository.findOne({ email: writerEmail });
    if (!writer) {
      throw new Error(`User with email ${writerEmail} not found.`);
    }

    const gameStore = await this.gameStoreRepository.findOne(gameStoreId);
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

  findAll() {
    return `This action returns all gameStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameStore`;
  }

  update(id: number, updateGameStoreDto: UpdateGameStoreDto) {
    return `This action updates a #${id} gameStore`;
  }

  async gameStoreLikeUpdate(gameStoreId: string, userEmail: string) {
    const queryBuilder = this.getGameStoreWithRelations();
    const gameStore: GameStore = await queryBuilder
      .where('gameStore.id = :gameStoreId', { gameStoreId })
      .getOne();

    const createdAt = cloneDeep(gameStore.createdAt);
    if (!gameStore.likedUsers.map((user) => user.email).includes(userEmail)) {
      gameStore.likedUsers.push(
        await this.userRepository.findOne({ email: userEmail }),
      );
      gameStore.like += 1;
    } else {
      gameStore.likedUsers = gameStore.likedUsers.filter(
        (user) => user.email != userEmail,
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
