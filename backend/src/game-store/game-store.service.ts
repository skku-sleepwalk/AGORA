import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import {
  GameStoreBoardCategoryRepository,
  GameStoreBoardLikeRelationRepository,
  GameStoreBoardRepository,
  GameStoreRepository,
} from './game-store.repository';
import { UserRepository } from 'src/users/user.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { PaginationOptions } from 'typeorm-cursor-pagination';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import {
  GameStoreBoard,
  GameStoreBoardCategory,
} from './entities/game-store-board.entity';
import { v4 as uuid } from 'uuid';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';

@Injectable()
export class GameStoreService {
  private readonly userRepository: UserRepository;
  private readonly gameStoreRepository: GameStoreRepository;
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
    this.gameStoreBoardCategoryRepository = connection.getCustomRepository(
      GameStoreBoardCategoryRepository,
    );
    this.gameStoreBoardLikeRelationRepository = connection.getCustomRepository(
      GameStoreBoardLikeRelationRepository,
    );
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

  createGameStore(authorEmail: string, createGameStoreDto: CreateGameStoreDto) {
    return 'This action adds a new gameStore';
  }

  async createGameStoreBoards(
    writerEmail: string,
    createGameStoreBoardsDto: CreateGameStoreBoardDto,
  ) {
    const { title, content, parentId, categoryNames } =
      createGameStoreBoardsDto;

    const writer = await this.userRepository.findOne({ email: writerEmail });
    if (!writer) {
      throw new Error(`User with email ${writerEmail} not found.`);
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

  async createGameStoreBoardCategory(
    createGameStoreBoardCategoryDto: CreateGameStoreBoardCategoryDto,
  ) {
    const { name } = createGameStoreBoardCategoryDto;
    const newCategory = this.gameStoreBoardCategoryRepository.create({
      name,
    });
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

  remove(id: number) {
    return `This action removes a #${id} gameStore`;
  }
}
