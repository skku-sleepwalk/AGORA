import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoardCategory } from 'src/entites/game/game.board.category.entity';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { Game } from 'src/entites/game/game.entity';
import { User } from 'src/entites/user.entity';
import { In, Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameBoardDto } from '../dto/game.board.dto';
import { GameBoardLike } from 'src/entites/game/game.board.like.entity';
// NestJS 데코레이터와 함께 사용하는 GameBoardService 클래스
@Injectable()
export class GameBoardService {
  // 생성자에서 사용할 Repository들을 주입받음
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

  // 쿼리 빌더를 생성하고 게시물 데이터와 관계된 데이터를 조인하여 반환하는 메서드
  createQueryBuilder() {
    return this.gameBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.author', 'author')
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categories', 'categories');
  }

  // 게시물의 자식 개수를 재귀적으로 계산하여 반환하는 메서드
  async getChildCount(parentId: string): Promise<number> {
    // parentId가 주어지지 않으면 자식이 없으므로 0을 반환
    if (!parentId) {
      return 0;
    }

    // 주어진 parentId의 자식들과 개수를 조회
    const [children, count] = await this.gameBoardRepository.findAndCount({
      where: { parent: { id: parentId } },
    });

    // totalCount를 현재 자식 개수로 초기화
    let totalCount = count;

    // 각 자식에 대해 재귀적으로 getChildCount 호출하여 하위 항목들의 개수를 얻고 더해줌
    for (const child of children) {
      const childCount = await this.getChildCount(child.id);
      totalCount += childCount;
    }

    // 총 하위 항목들의 개수 반환
    return totalCount;
  }

  // 게시물을 받아와서 좋아요 여부, 좋아요 개수, 자식 개수를 추가한 DTO를 반환하는 메서드
  async boardModifying(
    userEmail: string,
    board: GameBoardDto | null,
  ): Promise<GameBoardDto> {
    if (!board) {
      return null;
    }

    // 게시물에 대한 좋아요 정보 조회
    const [likeRelations, likeCount] =
      await this.gameBoardLikeRepository.findAndCount({
        where: { board: { id: board.id } },
        relations: ['user'],
      });

    // 현재 사용자의 이메일과 게시물에 대한 좋아요 여부 확인
    const like =
      likeRelations.filter((relation) => relation.user.email === userEmail)
        .length > 0
        ? true
        : false;

    // 자식 개수 조회
    const childCount = await this.getChildCount(board.id);

    // 게시물 데이터에 좋아요 여부와 개수, 자식 개수를 추가하여 반환
    return {
      ...board,
      like,
      likeCount,
      childCount,
    };
  }

  // 게시물들의 배열을 받아서 각 게시물에 대해 boardModifying을 호출하여 수정된 데이터를 반환하는 메서드
  async dataModifying(
    userEmail: string,
    data: Array<GameBoardDto>,
  ): Promise<Array<GameBoardDto>> {
    return await Promise.all(
      data.map(async (board) => {
        return this.boardModifying(userEmail, board);
      }),
    );
  }

  // 게시물을 페이징하여 데이터와 커서를 반환하는 메서드
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

  // 게시물 작성 메서드
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

      // 6. GameBoard와 GameBoardCategory 관계 설정
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

  // 게시물들을 카테고리로 필터링하여 페이징한 데이터를 반환하는 메서드
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

  // 게시물들을 검색어와 카테고리, 부모/자식 여부로 필터링하여 페이징한 데이터를 반환하는 메서드
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

  // 게시물의 자식들을 페이징하여 데이터와 커서를 반환하는 메서드
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

  // 게시물의 상세 정보를 조회하여 반환하는 메서드
  async getOneGameBoard(userEmail: string, gameId: string, boardId: string) {
    const board = this.boardModifying(
      userEmail,
      await this.gameBoardRepository.findOne({
        where: { id: boardId, game: { id: gameId } },
        relations: ['author', 'categories', 'parent'],
      }),
    );
    if (!board) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    return board;
  }

  // 게시물을 수정하는 메서드
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

      // 3. 현재 유저가 해당 게시물의 작성자인지 확인
      if (board.author.id !== user.id) {
        throw new ForbiddenException('해당 게시물의 작성자가 아닙니다.');
      }

      // 4. 게시물 업데이트
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

  // 게시물을 삭제하는 메서드
  async deleteGameBoard(userEmail: string, gameId: string, boardId: string) {
    // 1. 현재 유저 가져오기
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게시물 엔티티 가져오기
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
      // 자식이 있는 경우 소프트 딜리트 (deletedAt이 설정됨)
      await this.gameBoardRepository.softDelete(board.id);
    } else {
      // 자식이 없는 경우 하드 딜리트
      await this.gameBoardRepository.delete(board.id);
    }

    // 부모의 부모로 재귀적으로 호출하여 부모의 삭제 상태 업데이트
    await this.updateAncestorDeletedStatus(board.parent.id);
    return true;
  }

  // 부모의 삭제 상태를 재귀적으로 업데이트하는 메서드
  async updateAncestorDeletedStatus(boardId: string): Promise<void> {
    const board = await this.gameBoardRepository.findOne({
      where: { id: boardId },
      relations: ['parent'],
    });

    // 자식 개수 조회
    const childCount = await this.getChildCount(board.id);

    if (childCount === 0 && board.deletedAt) {
      // 자식이 없고, 현재 게시글이 삭제 상태라면 하드 딜리트 수행
      await this.gameBoardRepository.delete(board.id);
    }

    // 부모의 부모로 재귀적으로 호출하여 상위 게시글의 삭제 상태 업데이트
    if (board.parent) {
      await this.updateAncestorDeletedStatus(board.parent.id);
    }
  }
}
