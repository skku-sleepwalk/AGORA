import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository, SelectQueryBuilder } from 'typeorm';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommunityBoard } from 'src/entites/community/community.board.entity';
import { CommunityCategory } from 'src/entites/community/community.category.entity';
import { User } from 'src/entites/user.entity';
import { CommunityBoardDto } from '../dto/community.board.dto';
import { CommunityBoardLike } from 'src/entites/community/community.board.like.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CommunityBoardView } from 'src/entites/community/community.board.view.entity';

@Injectable()
export class CommunityBoardService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(CommunityBoard)
    private readonly communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(CommunityBoardLike)
    private readonly communityBoardLikeRepository: Repository<CommunityBoardLike>,
    @InjectRepository(CommunityBoardView)
    private readonly communityBoardViewRepository: Repository<CommunityBoardView>,
    @InjectRepository(CommunityCategory)
    private readonly communityCategoryRepository: Repository<CommunityCategory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // TypeORM QueryBuilder를 생성하는 메서드
  createQueryBuilder() {
    const queryBuilder = this.communityBoardRepository
      .createQueryBuilder('board')
      .withDeleted() // Soft Delete된 데이터도 조회하기 위해 withDeleted()를 사용
      .leftJoinAndSelect('board.author', 'author')
      .leftJoinAndSelect('board.categories', 'categories')
      .leftJoinAndSelect('board.parent', 'parent');
    return queryBuilder;
  }

  // 하위 게시물 개수를 재귀적으로 계산하는 메서드
  async getChildCount(parentId: string): Promise<number> {
    if (!parentId) {
      return 0; // parentId가 제공되지 않으면 0을 반환하여 자식이 없음을 표시합니다.
    }

    // parentId를 가진 하위 게시물들을 조회하고 개수를 세어 반환합니다.
    const [children, count] = await this.communityBoardRepository.findAndCount({
      where: { parent: { id: parentId } },
    });

    let totalCount = count; // 즉시 하위 항목들의 개수로 totalCount를 초기화합니다.

    // 각 하위 게시물들에 대해 getChildCount를 재귀적으로 호출하여 하위 항목들의 개수를 얻고, 총 개수에 더합니다.
    for (const child of children) {
      const childCount = await this.getChildCount(child.id);
      totalCount += childCount;
    }

    return totalCount;
  }

  // 게시물 정보를 가공하여 반환하는 메서드
  async boardModifying(
    userEmail: string,
    board: CommunityBoardDto | null,
  ): Promise<CommunityBoardDto> {
    if (!board) {
      return null; // board가 null이면 null을 반환하여 처리를 마무리합니다.
    }

    // 해당 게시물에 대한 좋아요 여부와 개수를 조회합니다.
    const [likeRelations, likeCount] =
      await this.communityBoardLikeRepository.findAndCount({
        where: { board: { id: board.id } },
        relations: ['user'],
      });

    // 좋아요 여부에 따라 like 속성을 추가합니다.
    const like =
      likeRelations.filter((relation) => relation.user.email === userEmail)
        .length > 0
        ? true
        : false;

    // 자식 게시물 개수를 조회합니다.
    const childCount = await this.getChildCount(board.id);

    // 조회수를 조회합니다.
    const viewCount = await this.communityBoardViewRepository
      .createQueryBuilder('boardView')
      .where('boardView.boardId = :boardId', { boardId: board.id })
      .getCount();

    // 게시물 데이터에 like 속성과 childCount 속성을 추가하여 반환합니다.
    return {
      ...board,
      like,
      likeCount,
      childCount,
    };
  }

  // 게시물 배열에 대해 boardModifying 메서드를 적용하여 변경된 게시물 배열을 반환하는 메서드
  async dataModifying(
    userEmail: string,
    data: Array<CommunityBoardDto>,
  ): Promise<Array<CommunityBoardDto>> {
    return await Promise.all(
      data.map(async (board) => {
        return this.boardModifying(userEmail, board);
      }),
    );
  }

  // 게시물 리스트를 페이징 처리하여 반환하는 메서드
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

    // data 배열을 가공하여 반환합니다.
    const dataModified: Array<CommunityBoardDto> = await this.dataModifying(
      userEmail,
      data,
    );

    return { data: dataModified, cursor };
  }

  // 새로운 게시물을 생성하는 메서드
  async createBoard(
    userEmail: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
    parentId: string,
  ) {
    // 트랜잭션을 위한 QueryRunner 생성
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

      // 새로운 게시물 엔티티를 생성합니다.
      const newBoard: CommunityBoard = queryRunner.manager
        .getRepository(CommunityBoard)
        .create({ author: user, title, content, parent });

      const categories: CommunityCategory[] = [];

      // 카테고리를 조회하여 존재하는 경우 categories 배열에 추가합니다.
      for (const categoryName of categoryNames) {
        const category = await queryRunner.manager
          .getRepository(CommunityCategory)
          .findOne({
            where: {
              name: categoryName,
            },
          });
        if (category) {
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
      // 트랜잭션 종료 및 QueryRunner 반환
      await queryRunner.release();
    }
  }

  // 게시물 하나를 조회하고 가공하여 반환하는 메서드
  async getOneBoard(userEmail: string, id: string) {
    const board = await this.communityBoardRepository.findOne({
      where: { id },
      relations: ['author', 'categories', 'parent'],
    });

    // 게시물 조회수를 증가시킵니다.
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (user) {
      const currentDateTime = new Date();
      const oneHourAgo = new Date(currentDateTime);
      oneHourAgo.setHours(currentDateTime.getHours() - 1);

      const existingViewCount = await this.communityBoardViewRepository
        .createQueryBuilder('boardView')
        .where('boardView.userId = :userId', { userId: user.id })
        .andWhere('boardView.boardId = :boardId', { boardId: board.id })
        .andWhere('boardView.createdAt >= :oneHourAgo', { oneHourAgo }) // 현재 시간으로부터 1시간 이내
        .andWhere('boardView.createdAt <= :currentDateTime', {
          currentDateTime,
        })
        .getCount();

      if (existingViewCount === 0) {
        const newBoardView = this.communityBoardViewRepository.create({
          user,
          board,
        });
        await this.communityBoardViewRepository.save(newBoardView);
      }
    }

    const boardModified = this.boardModifying(userEmail, board);
    return boardModified;
  }

  // 특정 카테고리에 속한 게시물 리스트를 페이징 처리하여 반환하는 메서드
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

  // 검색어와 카테고리에 해당하는 게시물 리스트를 페이징 처리하여 반환하는 메서드
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

  // 특정 게시물의 자식 게시물 리스트를 페이징 처리하여 반환하는 메서드
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

  // 게시물을 수정하는 메서드
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

      // 2. CommunityBoard 엔티티를 boardId로 찾기
      const board = boardId
        ? await this.communityBoardRepository.findOne({
            where: { id: boardId },
            relations: ['author'],
          })
        : null;
      if (!board) {
        throw new NotFoundException('게시물을 찾을 수 없습니다.');
      }

      // 3. 현재 유저가 해당 게시물의 작성자인지 확인
      if (board.author.id !== user.id) {
        throw new ForbiddenException('해당 게시물의 작성자가 아닙니다.');
      }

      // 4. CommunityBoard 엔티티 수정
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

      // 6. CommunityBoard와 CommunityBoardCategory 관계 설정
      board.categories = categories;
      await queryRunner.manager.save(CommunityBoard, board);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 QueryRunner 반환
      await queryRunner.release();
    }
  }

  // 게시물을 삭제하는 메서드
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

    // 2. CommunityBoard 엔티티 가져오기
    const board = boardId
      ? await this.communityBoardRepository.findOne({
          where: { id: boardId },
          relations: ['author'],
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게시물의 작성자인지 확인
    if (board.author.id !== user.id) {
      throw new ForbiddenException('해당 게시물의 작성자가 아닙니다.');
    }

    // 4. 게시물 삭제
    if ((await this.getChildCount(board.id)) > 0) {
      // 하위 게시물이 있으면 Soft Delete 수행
      await this.communityBoardRepository.softDelete(board.id);
    } else {
      // 하위 게시물이 없으면 Hard Delete 수행
      await this.communityBoardRepository.delete(board.id);
    }

    return true;
  }

  // 부모 게시물들의 삭제 상태를 업데이트하는 메서드
  async updateAncestorDeletedStatus(boardId: string): Promise<void> {
    const board = await this.communityBoardRepository.findOne({
      where: { id: boardId },
      relations: ['parent'],
    });

    const childCount = await this.getChildCount(board.id);

    if (childCount === 0 && board.deletedAt) {
      // 자식이 없고, 현재 게시물이 삭제 상태라면 하드 삭제 수행
      await this.communityBoardRepository.delete(board.id);
    }

    // 부모의 부모로 재귀적으로 호출
    if (board.parent) {
      await this.updateAncestorDeletedStatus(board.parent.id);
    }
  }
}
