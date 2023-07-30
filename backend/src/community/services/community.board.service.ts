import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { User } from 'src/entites/user.entity';
import { CommunityBoardDto } from '../dto/community.board.dto';
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
    private readonly communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(CommunityBoardLike)
    private readonly communityBoardLikeRepository: Repository<CommunityBoardLike>,
    @InjectRepository(CommunityCategory)
    private readonly communityCategoryRepository: Repository<CommunityCategory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createQueryBuilder() {
    const queryBuilder = this.communityBoardRepository
      .createQueryBuilder('board')
      .withDeleted()
      .leftJoinAndSelect('board.author', 'author')
      .leftJoinAndSelect('board.categories', 'categories');
    return queryBuilder;
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

  async paginating(
    userEmail: string,
    _cursor: Cursor,
    queryBuilder: SelectQueryBuilder<CommunityBoard>,
  ) {
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
    const queryRunner =
      this.communityBoardRepository.manager.connection.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const user: User = userEmail
      ? await queryRunner.manager.getRepository(User).findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    try {
      const parent = parentId
        ? await this.communityBoardRepository.findOne({
            where: { id: parentId },
          })
        : null;

      const newBoard: CommunityBoard = queryRunner.manager
        .getRepository(CommunityBoard)
        .create({ author: user, title, content, parent });

      const categories: CommunityCategory[] = [];

      for (const categoryName of categoryNames) {
        const category = await queryRunner.manager
          .getRepository(CommunityCategory)
          .findOne({
            where: {
              name: categoryName,
            },
          });
        if (!category) {
          categories.push(
            await queryRunner.manager.save(CommunityCategory, {
              name: categoryName,
            }),
          );
        } else {
          categories.push(category);
        }
      }
      newBoard.categories = categories;
      await queryRunner.manager.save(CommunityBoard, newBoard);
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
      '(board.parent IS NULL) AND (categories.name IN (:...categoryNames))',
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
    boardType: 'parent' | 'child',
  ) {
    const queryBuilder =
      boardType === 'parent'
        ? this.createQueryBuilder()
            .where(
              '(categories.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
              { categoryNames, search: `%${search}%` },
            )
            .andWhere('board.parentId IS NULL')
        : this.createQueryBuilder()
            .where(
              '(categories.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
              { categoryNames, search: `%${search}%` },
            )
            .andWhere('board.parentId IS NOT NULL');
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
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. CommunityBoard 엔티티를 gameId로 찾기
      const board = boardId
        ? await this.communityBoardRepository.findOne({
            where: { id: boardId },
            relations: ['author'],
          })
        : null;
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
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. communityBoard 엔티티 가져오기
    const board = boardId
      ? await this.communityBoardRepository.findOne({
          where: { id: boardId },
          relations: ['author'],
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (board.author.id !== user.id) {
      throw new ForbiddenException('해당 게시글의 작성자가 아닙니다.');
    }

    // 4. 게시글 삭제
    if ((await this.getChildCount(board.id)) > 0) {
      await this.communityBoardRepository.softDelete(board.id);
    } else {
      await this.communityBoardRepository.delete(board.id);
    }

    return true;
  }

  async updateAncestorDeletedStatus(boardId: string): Promise<void> {
    const board = await this.communityBoardRepository.findOne({
      where: { id: boardId },
      relations: ['parent'],
    });

    const childCount = await this.getChildCount(board.id);

    if (childCount === 0 && board.deletedAt) {
      // 자식이 없고, 현재 게시글이 삭제 상태라면 hard delete 수행
      await this.communityBoardRepository.delete(board.id);
    }

    // 부모의 부모로 재귀적으로 호출
    if (board.parent) {
      await this.updateAncestorDeletedStatus(board.parent.id);
    }
  }
}
