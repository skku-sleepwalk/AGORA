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
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categories', 'categories');
  }

  async getChildCount(parentId: string): Promise<number> {
    if (!parentId) {
      return 0; // parentId가 제공되지 않으면 0을 반환하여 자식이 없음을 표시합니다.
    }

    const [children, count] = await this.gameBoardRepository.findAndCount({
      where: { parent: { id: parentId } },
    });

    let totalCount = count; // 즉시 하위 항목들의 개수로 totalCount를 초기화합니다.

    for (const child of children) {
      const childCount = await this.getChildCount(child.id); // 각 자식에 대해 getChildCount를 재귀적으로 호출하여 하위 항목들의 개수를 얻습니다.
      totalCount += childCount; // 각 자식의 하위 항목들의 개수를 totalCount에 더하여 총 하위 항목들의 개수를 구합니다.
    }

    return totalCount;
  }

  async boardModifying(
    userEmail: string,
    board: GameBoardDto | null,
  ): Promise<GameBoardDto> {
    if (!board) {
      return null;
    }
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

    const childCount = await this.getChildCount(board.id);
    // game 데이터에 like 속성 추가하여 반환
    return {
      ...board,
      like,
      likeCount,
      childCount,
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
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. Game 엔티티를 gameId로 찾기
      const game = gameId
        ? await this.gameRepository.findOne({ where: { id: gameId } })
        : null;
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 3. Parent 확인
      const parent = parentId
        ? await this.gameBoardRepository.findOne({
            where: { id: parentId },
          })
        : null;

      // 4. GameBoard 엔티티 생성
      const newBoard = this.gameBoardRepository.create({
        title,
        content,
        parent,
        author: user,
        game,
      });

      // 5. GameBoardCategory 엔티티 저장 (중복 방지)
      const categories: Array<GameBoardCategory> = [];
      for (const categoryName of categoryNames) {
        const existingCategory = await this.gameBoardCategoryRepository.findOne(
          { where: { name: categoryName } },
        );
        if (existingCategory.name !== categoryName) {
          continue;
        } else {
          categories.push(existingCategory);
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
    gameId: string,
    categoryNames: Array<string>,
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      '(board.parentId IS NULL) AND (board.gameId = :gameId) AND (categories.name IN (:...categoryNames))',
      { gameId, categoryNames },
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
    gameId: string,
    categoryNames: Array<string>,
    search: string,
    boardType: 'parent' | 'child',
  ) {
    const _queryBuilder = this.createQueryBuilder().where(
      '(board.gameId = :gameId) AND (categories.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
      { gameId, categoryNames, search: `%${search}%` },
    );
    const queryBuilder =
      boardType === 'parent'
        ? _queryBuilder.andWhere('board.parentId IS NULL')
        : _queryBuilder.andWhere('board.parentId IS NOT NULL');
    const { data, cursor } = await this.paginating(
      userEmail,
      _cursor,
      queryBuilder,
    );
    return { data, cursor };
  }

  async getChild(
    userEmail: string,
    _cursor: Cursor,
    gameId: string,
    parentId: string,
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      'board.gameId=:gameId AND board.parentId =:parentId',
      { gameId, parentId },
    );
    const { data, cursor } = await this.paginating(
      userEmail,
      _cursor,
      queryBuilder,
    );
    return { data, cursor };
  }

  async getOneGameBoard(userEmail: string, gameId: string, boardId: string) {
    const board = this.boardModifying(
      userEmail,
      await this.gameBoardRepository.findOne({
        where: { id: boardId, game: { id: gameId } },
      }),
    );
    if (!board) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    return board;
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
      relations: ['author', 'parent'],
    });
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게시글의 작성자인지 확인
    if (board.author.id !== user.id) {
      throw new ForbiddenException('해당 게시글의 작성자가 아닙니다.');
    }

    // 4. 게시글 삭제
    if ((await this.getChildCount(board.id)) > 0) {
      await this.gameBoardRepository.softDelete(board.id);
    } else {
      await this.gameBoardRepository.delete(board.id);
    }

    await this.updateAncestorDeletedStatus(board.parent.id);
    return true;
  }

  async updateAncestorDeletedStatus(boardId: string): Promise<void> {
    const board = await this.gameBoardRepository.findOne({
      where: { id: boardId },
      relations: ['parent'],
    });

    const childCount = await this.getChildCount(board.id);

    if (childCount === 0 && board.deletedAt) {
      // 자식이 없고, 현재 게시글이 삭제 상태라면 hard delete 수행
      await this.gameBoardRepository.delete(board.id);
    }

    // 부모의 부모로 재귀적으로 호출
    if (board.parent) {
      await this.updateAncestorDeletedStatus(board.parent.id);
    }
  }
}
