import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { User } from 'src/entites/user.entity';
import { CommunityBoardDto } from '../dto/communityBoard.dto';
import { CommunityBoardLike } from 'src/entites/community.board.like.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';

@Injectable()
export class CommunityBoardService {
  constructor(
    @InjectRepository(CommunityBoard)
    private communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(CommunityBoardLike)
    private communityBoardLikeRepository: Repository<CommunityBoardLike>,
    @InjectRepository(CommunityCategory)
    private communityCategoryRepository: Repository<CommunityCategory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  createQueryBuilder() {
    return this.communityBoardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.author', 'author')
      .leftJoinAndSelect('board.category', 'category');
  }

  async getChildCount(parentId: string): Promise<number> {
    if (!parentId) {
      return 0; // parentId가 제공되지 않으면 0을 반환하여 자식이 없음을 표시합니다.
    }

    const [children, count] = await this.communityBoardRepository.findAndCount({
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
    board: CommunityBoardDto | null,
  ): Promise<CommunityBoardDto> {
    if (!board) {
      return null;
    }
    const [likeRelations, likeCount] =
      await this.communityBoardLikeRepository.findAndCount({
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
    data: Array<CommunityBoardDto>,
  ): Promise<Array<CommunityBoardDto>> {
    return await Promise.all(
      data.map(async (board) => {
        return this.boardModifying(userEmail, board);
        // userEmail과 game.id를 이용하여 좋아요 여부 조회
      }),
    );
  }

  async paginating(userEmail: string, _cursor: Cursor, queryBuilder) {
    const paginationOption: PaginationOptions<CommunityBoard> = {
      entity: CommunityBoard,
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
    const dataModified: Array<CommunityBoardDto> = await this.dataModifying(
      userEmail,
      data,
    );
    return { data: dataModified, cursor };
  }

  async createBoard(
    userEmail: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
    parentId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const user: User = await queryRunner.manager.getRepository(User).findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    try {
      const parent: CommunityBoard = await queryRunner.manager
        .getRepository(CommunityBoard)
        .findOne({ where: { id: parentId } });
      const newBoard: CommunityBoard = await queryRunner.manager
        .getRepository(CommunityBoard)
        .save({ author: user, title, content, parent });

      const promises = Object.keys(categoryNames).map(async (categoryName) => {
        const genre = await queryRunner.manager
          .getRepository(CommunityCategory)
          .findOne({
            where: {
              name: categoryName,
            },
          });
        if (!genre) {
          return await queryRunner.manager
            .getRepository(CommunityCategory)
            .save({ name: categoryName });
        } else {
          return genre;
        }
      });

      const Categories: CommunityCategory[] = await Promise.all(promises);
      newBoard.categories.push(...Categories);

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

  async getOneBoard(userEmail: string, id: string) {
    const board = await this.communityBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    const boardModified = this.boardModifying(userEmail, board);
    return boardModified;
  }

  async getCommunityBoardByCategory(
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

  async searchBoard(
    userEmail: string,
    _cursor: Cursor,
    categoryNames: Array<string>,
    search: string,
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      'category.name IN (...categoryName) AND (board.title :search OR board.contetn LIKE :search)',
      { categoryNames, search },
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

  async updateCommunityBoard(
    userEmail: string,
    boardId: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
  ) {
    // 트랜잭션 시작
    const queryRunner =
      this.communityBoardRepository.manager.connection.createQueryRunner();
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

      // 2. CommunityBoard 엔티티를 gameId로 찾기
      const board = await this.communityBoardRepository.findOne({
        where: { id: boardId },
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
      const categories: Array<CommunityCategory> = [];
      const existingCategories = await this.communityCategoryRepository.find({
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
      await queryRunner.manager.save(CommunityBoard, board);

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

  async deleteGameBoard(userEmail: string, boardId: string) {
    // 1. 현재 유저 가져오기
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. communityBoard 엔티티 가져오기
    const board = await this.communityBoardRepository.findOne({
      where: { id: boardId },
      relations: ['author'],
    });
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (board.author.id !== user.id) {
      throw new ForbiddenException('해당 게시글의 작성자가 아닙니다.');
    }

    // 4. 게시글 삭제
    await this.communityBoardRepository.delete(board);

    return true;
  }
}
