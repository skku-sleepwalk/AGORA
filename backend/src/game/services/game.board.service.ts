import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoardCategory } from 'src/entites/game.board.category.entity';
import { GameBoard } from 'src/entites/game.board.entity';
import { Game } from 'src/entites/game.entity';
import { User } from 'src/entites/user.entity';
import { In, Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameBoardDto } from '../dto/game.board.dto';
import { GameBoardLike } from 'src/entites/game.board.like.entity';

@Injectable()
export class GameBoardService {
  constructor(
    @InjectRepository(GameBoard)
    private readonly gameBoardRepository: Repository<GameBoard>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameBoardCategory)
    private readonly gameBoardCategoryRepository: Repository<GameBoardCategory>,
    @InjectRepository(GameBoardLike)
    private readonly gameBoardLikeRepository: Repository<GameBoardLike>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createQueryBuilder() {
    return this.gameBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.author', 'author')
      .leftJoinAndSelect('board.category', 'category');
  }

  async boardModifying(
    userEmail: string,
    board: GameBoardDto,
  ): Promise<GameBoardDto> {
    const [likeRelations, likeCount] =
      await this.gameBoardLikeRepository.findAndCount({
        where: { board: { id: board.id } },
        relations: ['user'],
      });

    // 좋아요 여부에 따라 like 속성 추가
    const like =
      likeRelations.filter((relation) => relation.user.email === userEmail)
        .length > 0
        ? true
        : false;

    // game 데이터에 like 속성 추가하여 반환
    return {
      ...board,
      like,
      likeCount,
    };
  }

  async dataModifying(
    userEmail: string,
    data: Array<GameBoardDto>,
  ): Promise<Array<GameBoardDto>> {
    return await Promise.all(
      data.map(async (board) => {
        return this.boardModifying(userEmail, board);
        // userEmail과 game.id를 이용하여 좋아요 여부 조회
      }),
    );
  }

  async paginating(userEmail: string, _cursor: Cursor, queryBuilder) {
    const paginationOption: PaginationOptions<GameBoard> = {
      entity: GameBoard,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 10,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('board');
    const { data, cursor } = await paginator.paginate(queryBuilder);
    const dataModified: Array<GameBoardDto> = await this.dataModifying(
      userEmail,
      data,
    );
    return { data: dataModified, cursor };
  }

  async postGameBoard(
    userEmail: string,
    gameId: string,
    title: string,
    content: string,
    parentId: string,
    categoryNames: Array<string>,
  ) {
    // 트랜잭션 시작
    const queryRunner =
      this.gameBoardRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾기
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. Game 엔티티를 gameId로 찾기
      const game = await this.gameRepository.findOne({ where: { id: gameId } });
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 3. Parent 확인
      const parent = await this.gameBoardRepository.findOne({
        where: { id: parentId },
      });

      // 4. GameBoard 엔티티 생성
      const newBoard = this.gameBoardRepository.create({
        title,
        content,
        parent,
        author: user,
      });

      // 5. GameBoardCategory 엔티티 저장 (중복 방지)
      const categories: Array<GameBoardCategory> = [];
      for (const categoryName of categoryNames) {
        const existingCategory = await this.gameBoardCategoryRepository.findOne(
          { where: { name: categoryName } },
        );
        if (existingCategory) {
          categories.push(existingCategory);
        } else {
          const newCategory = this.gameBoardCategoryRepository.create({
            name: categoryName,
          });
          const savedCategory = await queryRunner.manager.save(
            GameBoardCategory,
            newCategory,
          );
          categories.push(savedCategory);
        }
      }

      // 5. Game과 Genre의 관계 설정
      newBoard.categories = categories;
      await queryRunner.manager.save(GameBoard, newBoard);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 쿼리 러너 반환
      await queryRunner.release();
    }
  }

  async getGameBoardByCategory(
    userEmail: string,
    _cursor: Cursor,
    categoryNames: Array<string>,
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      'category.name IN (...categoryName)',
      { categoryNames },
    );
    const { data, cursor } = await this.paginating(
      userEmail,
      _cursor,
      queryBuilder,
    );
    return { data, cursor };
  }

  async searchGameBoard(
    userEmail: string,
    _cursor: Cursor,
    categoryNames: Array<string>,
    search: string,
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      '(category.name IN (...categoryName)) AND (board.title :search OR board.contetn LIKE :search)',
      { categoryNames, search: `%${search}%` },
    );
    const { data, cursor } = await this.paginating(
      userEmail,
      _cursor,
      queryBuilder,
    );
    return { data, cursor };
  }

  async getChild(userEmail: string, _cursor: Cursor, parentId: string) {
    const queryBuilder = this.createQueryBuilder().where(
      'board.parentId =:parentId',
      { parentId },
    );
    const { data, cursor } = await this.paginating(
      userEmail,
      _cursor,
      queryBuilder,
    );
    return { data, cursor };
  }

  async updateGameBoard(
    userEmail: string,
    gameId: string,
    boardId: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
  ) {
    // 트랜잭션 시작
    const queryRunner =
      this.gameRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾기
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. GameBoard 엔티티를 gameId로 찾기
      const board = await this.gameBoardRepository.findOne({
        where: { id: boardId, game: { id: gameId } },
        relations: ['author'],
      });
      if (!board) {
        throw new NotFoundException('게시물을 찾을 수 없습니다.');
      }

      // 3. 현재 유저가 해당 게임의 작성자인지 확인
      if (board.author.id !== user.id) {
        throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
      }

      // 4. GameBoard 엔티티 수정
      board.title = title;
      board.content = content;

      // 5. Category 가져오기 (중복 방지)
      const categories: Array<GameBoardCategory> = [];
      const existingCategories = await this.gameBoardCategoryRepository.find({
        where: { name: In(categoryNames) },
      });

      for (const categoryName of categoryNames) {
        const existingCategory = existingCategories.find(
          (category) => category.name === categoryName,
        );
        if (existingCategory) {
          categories.push(existingCategory);
        }
      }

      // 6. GameBoard와 GameBoardCategory 관계 설정
      board.categories = categories;
      await queryRunner.manager.save(GameBoard, board);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 쿼리 러너 반환
      await queryRunner.release();
    }
  }

  async deleteGameBoard(userEmail: string, gameId: string, boardId: string) {
    // 1. 현재 유저 가져오기
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. GameBoard 엔티티 가져오기
    const board = await this.gameBoardRepository.findOne({
      where: { id: boardId, game: { id: gameId } },
      relations: ['author'],
    });
    if (!board) {
      throw new NotFoundException('게시판을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (board.author.id !== user.id) {
      throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
    }

    // 4. 게임 삭제
    await this.gameRepository.delete(gameId);

    return true;
  }
}
