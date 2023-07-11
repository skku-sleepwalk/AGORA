import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, Order } from './entities/board.entity';
import { BoardRepository } from './boards.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CategoryTypeRepository } from './category/category.repository';
import { UserRepository } from 'src/users/user.repository';
import { cloneDeep } from 'lodash';

@Injectable()
export class BoardsService {
  private readonly boardRepository: BoardRepository;
  private readonly categoryTypeRepository: CategoryTypeRepository;
  private readonly userRepository: UserRepository;
  constructor(private readonly connection: Connection) {
    this.boardRepository = connection.getCustomRepository(BoardRepository);
    this.categoryTypeRepository = connection.getCustomRepository(
      CategoryTypeRepository,
    );
    this.userRepository = connection.getCustomRepository(UserRepository);
  }
  private paginateOption: PaginationOptions<Board> = {
    entity: Board,
    paginationKeys: ['createdAt'],
    query: {
      afterCursor: null,
      beforeCursor: null,
      limit: 5,
      order: 'DESC',
    },
  };
  getBoardWithRelations(): SelectQueryBuilder<Board> {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.writer', 'writer')
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categoryTypes', 'categoryTypes')
      .leftJoinAndSelect('board.likedUsers', 'likedUsers');
  }

  ///////////////////////////{  CREATE  }/////////////////////////////////
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, content, writerEmail, parentId, categoryNames } =
      createBoardDto;

    // User check
    const writer = await this.userRepository.findOne({ email: writerEmail });
    if (!writer) {
      throw new Error(`User with email ${writerEmail} not found.`);
    }

    // Parent check
    let parent: Board | undefined;
    if (parentId) {
      parent = await this.getBoardWithRelations()
        .where('board.id = :id', {
          id: parentId,
        })
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
    }

    // Increment child count of parent recursively
    let currentParent = parent;
    while (currentParent) {
      currentParent.child += 1;
      this.boardRepository.save(currentParent);
      if (!currentParent.parent) {
        break;
      }
      const currentParentId = currentParent.parent.id;
      currentParent = await this.getBoardWithRelations()
        .where('board.id = :id', {
          id: currentParentId,
        })
        .getOne();
    }

    const newBoard = this.boardRepository.create({
      id: uuid(),
      title,
      content,
      writer,
      parent,
      categoryTypes: [], // Assuming you'll handle categoryTypes separately
    });

    for (const categoryName of categoryNames) {
      const categoryType = await this.categoryTypeRepository.findOne({
        name: categoryName,
      });
      if (categoryType) {
        newBoard.categoryTypes.push(categoryType);
      }
    }

    return this.boardRepository.save(newBoard);
  }

  ///////////////////////////{  READ  }/////////////////////////////////
  async getBoard(_cursor: Cursor) {
    const queryBuilder = this.getBoardWithRelations();
    const paginateOption: PaginationOptions<Board> = cloneDeep(
      this.paginateOption,
    );

    if (_cursor.afterCursor) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  findOne(id: string) {
    const queryBuilder: SelectQueryBuilder<Board> =
      this.getBoardWithRelations().andWhere('board.id = :boardId', {
        boardId: id,
      });
    return queryBuilder.getOne();
  }

  async searhBoards(
    categoryTypeNames: Array<string>,
    _cursor: Cursor,
    order: Order,
    search: string,
  ) {
    const queryBuilder: SelectQueryBuilder<Board> = this.getBoardWithRelations()
      .where('category.name IN (:...categoryNames)')
      .setParameter('categoryNames', categoryTypeNames);
    if (search) {
      queryBuilder.andWhere(
        '(categoryTypes.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
        {
          categoryNames: categoryTypeNames,
          search: `%${search}%`,
        },
      );
    }

    const paginateOption: PaginationOptions<Board> = cloneDeep(
      this.paginateOption,
    );
    paginateOption.paginationKeys = [order];
    if (_cursor.afterCursor) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }
  async getChild(parentId: string, _cursor: Cursor, order: Order) {
    const queryBuilder = this.getBoardWithRelations().where(
      'board.parentId = :parentId',
      { parentId: parentId },
    );
    const paginateOption = cloneDeep(this.paginateOption);
    this.paginateOption.paginationKeys = [order];
    if (_cursor.afterCursor) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  async findByUser(writerEmail: string) {
    return this.boardRepository.find({
      writer: await this.userRepository.findOne({ email: writerEmail }),
    });
  }

  ///////////////////////////{  UPDATE  }/////////////////////////////////
  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const toUpdateBoard = await this.findOne(id);
    const { updateEmail, title, content, categoryNames } = updateBoardDto;
    if (updateEmail === toUpdateBoard.writer.email) {
      toUpdateBoard.title = title;
      toUpdateBoard.content = content;
      toUpdateBoard.categoryTypes = [];
      for (const categoryName of categoryNames) {
        const categoryType = await this.categoryTypeRepository.findOne({
          name: categoryName,
        });
        if (categoryType) {
          toUpdateBoard.categoryTypes.push(categoryType);
        }
      }
      return await this.boardRepository.save(toUpdateBoard);
    } else {
      throw new HttpException(
        { message: 'Not a writter error' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async likeUpdate(boardId: string, userId: string) {
    const queryBuilder = this.getBoardWithRelations();
    const board: Board = await queryBuilder
      .where('board.id = :boardId', { boardId })
      .getOne();

    if (!board.likedUsers.map((user) => user.id).includes(userId)) {
      board.likedUsers.push(await this.userRepository.findOne(userId));
      board.like += 1;
    } else {
      board.likedUsers = board.likedUsers.filter((user) => user.id != userId);
      board.like -= 1;
    }
    return this.boardRepository.save(board);
  }
  ///////////////////////////{  DELETE  }/////////////////////////////////
  async remove(id: string) {
    await this.boardRepository.softDelete(id);
  }
}
