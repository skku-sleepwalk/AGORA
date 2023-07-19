import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  Board,
  BoardType,
  Order,
} from './entities/developer-community-board.entity';
import { BoardRepository } from './developer-community-boards.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CategoryTypeRepository } from './developer-community-category/developer-community-category.repository';
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
      .withDeleted()
      .leftJoinAndSelect('board.writer', 'writer')
      .leftJoinAndSelect('board.parent', 'parent')
      .leftJoinAndSelect('board.categoryTypes', 'categoryTypes')
      .leftJoinAndSelect('board.likedUsers', 'likedUsers');
  }

  ///////////////////////////{  CREATE  }/////////////////////////////////
  async createBoard(writerEmail: string, createBoardDto: CreateBoardDto) {
    const { title, content, parentId, categoryNames } = createBoardDto;

    // User check
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
  async getBoard(_cursor: Cursor, order: Order, categoryTypeNames: string[]) {
    const queryBuilder = this.getBoardWithRelations().where(
      '(board.parent IS NULL) AND (categoryTypes.name IN (:...categoryNames)) AND (board.deletedAt IS NULL)',
      { categoryNames: categoryTypeNames },
    );
    const paginateOption: PaginationOptions<Board> = cloneDeep(
      this.paginateOption,
    );
    paginateOption.paginationKeys = order
      ? [order]
      : paginateOption.paginationKeys;
    paginateOption.query.afterCursor =
      _cursor.afterCursor || paginateOption.query.afterCursor;
    paginateOption.query.beforeCursor =
      _cursor.beforeCursor || paginateOption.query.beforeCursor;

    const paginator = buildPaginator(paginateOption);
    console.log(paginator);
    const { data, cursor } = await paginator.paginate(queryBuilder);

    return { data, cursor };
  }

  async findOne(id: string) {
    const queryBuilder: SelectQueryBuilder<Board> =
      this.getBoardWithRelations().andWhere('board.id = :boardId', {
        boardId: id,
      });

    const board: Board = await queryBuilder.getOne();
    if (board.deletedAt) {
      board.title = null;
      board.content = null;
      board.writer = null;
    }
    if (board.parent && board.parent.deletedAt) {
      board.parent.title = null;
      board.parent.content = null;
      board.parent.writer = null;
    }
    return board;
  }

  async searhBoards(
    categoryTypeNames: Array<string>,
    _cursor: Cursor,
    order: Order,
    search: string,
    boardType: BoardType,
  ) {
    const paginateOption: PaginationOptions<Board> = cloneDeep(
      this.paginateOption,
    );
    paginateOption.paginationKeys = order
      ? [order]
      : paginateOption.paginationKeys;
    paginateOption.query.afterCursor =
      _cursor.afterCursor || paginateOption.query.afterCursor;
    paginateOption.query.beforeCursor =
      _cursor.beforeCursor || paginateOption.query.beforeCursor;

    const paginator = buildPaginator(paginateOption);
    let queryBuilder: SelectQueryBuilder<Board>;
    if (boardType === 'parent') {
      queryBuilder = this.getBoardWithRelations().where(
        '(board.deletedAt IS NULL) AND (board.parent IS NULL) AND (categoryTypes.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
        {
          categoryNames: categoryTypeNames,
          search: `%${search}%`,
        },
      );
      const { data, cursor } = await paginator.paginate(queryBuilder);
      return { data, cursor };
    } else {
      queryBuilder = this.getBoardWithRelations().where(
        '(board.deletedAt IS NULL) AND (board.parent IS NOT NULL) AND (categoryTypes.name IN (:...categoryNames)) AND (board.title LIKE :search OR board.content LIKE :search)',
        {
          categoryNames: categoryTypeNames,
          search: `%${search}%`,
        },
      );
      const { data, cursor } = await paginator.paginate(queryBuilder);
      data.map((board) => {
        if (board.parent.deletedAt !== null) {
          board.parent.title = null;
          board.parent.content = null;
          board.parent.writer = null;
        }
        return board;
      });

      return { data, cursor };
    }
  }
  async getChild(parentId: string, _cursor: Cursor, order: Order) {
    const queryBuilder: SelectQueryBuilder<Board> =
      this.getBoardWithRelations().where('board.parentId = :parentId', {
        parentId: parentId,
      });
    const paginateOption: PaginationOptions<Board> = cloneDeep(
      this.paginateOption,
    );
    paginateOption.paginationKeys = order
      ? [order]
      : paginateOption.paginationKeys;
    paginateOption.query.afterCursor =
      _cursor.afterCursor || paginateOption.query.afterCursor;
    paginateOption.query.beforeCursor =
      _cursor.beforeCursor || paginateOption.query.beforeCursor;

    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    data.map((board) => {
      if (board.deletedAt !== null) {
        board.title = null;
        board.content = null;
        board.writer = null;
      }
      return board;
    });
    return { data, cursor };
  }

  async findByUser(writerEmail: string) {
    return this.boardRepository.find({
      writer: await this.userRepository.findOne({ email: writerEmail }),
    });
  }

  ///////////////////////////{  UPDATE  }/////////////////////////////////
  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
    updateEmail: string,
  ) {
    const toUpdateBoard = await this.findOne(id);
    if (!toUpdateBoard) {
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

    if (updateEmail !== toUpdateBoard.writer.email) {
      throw new HttpException(
        {
          message: '작성자가 아닙니다.',
          error: {
            writerEmail: `${updateEmail}은(는) 해당 게시물의 작성자가 아닙니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { title, content, categoryNames } = updateBoardDto;

    const createdAt = cloneDeep(toUpdateBoard.createdAt);

    toUpdateBoard.title = title;
    toUpdateBoard.content = content;
    toUpdateBoard.categoryTypes = [];
    toUpdateBoard.createdAt = createdAt;
    for (const categoryName of categoryNames) {
      const categoryType = await this.categoryTypeRepository.findOne({
        name: categoryName,
      });
      if (categoryType) {
        toUpdateBoard.categoryTypes.push(categoryType);
      }
    }
    return await this.boardRepository.save(toUpdateBoard);
  }

  async likeUpdate(boardId: string, userEmail: string) {
    const queryBuilder = this.getBoardWithRelations();
    const board: Board = await queryBuilder
      .where('board.id = :boardId', { boardId })
      .getOne();

    if (!board) {
      throw new HttpException(
        {
          message: '입력한 데이터가 올바르지 않습니다.',
          error: {
            boardId: `ID가 ${boardId}인 게시물을 찾을 수 없습니다.`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepository.findOne({ email: userEmail });

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

    const createdAt = cloneDeep(board.createdAt);
    if (!board.likedUsers.map((user) => user.email).includes(userEmail)) {
      board.likedUsers.push(
        await this.userRepository.findOne({ email: userEmail }),
      );
      board.like += 1;
    } else {
      board.likedUsers = board.likedUsers.filter(
        (user) => user.email != userEmail,
      );
      board.like -= 1;
    }
    board.createdAt = createdAt;
    return this.boardRepository.save(board);
  }

  ///////////////////////////{  DELETE  }/////////////////////////////////
  async remove(id: string) {
    const queryBuilder = this.getBoardWithRelations();
    const toDeleteBoard = await queryBuilder
      .where('board.id = :id', { id })
      .getOne();

    if (!toDeleteBoard) {
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

    let currentParent = toDeleteBoard.parent;
    while (currentParent) {
      currentParent.child -= 1;
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
    const children: Array<Board> = await queryBuilder
      .where('board.parent.id = :id', {
        id,
      })
      .getMany();
    if (children.length !== 0) {
      await this.boardRepository.softDelete(id);
    } else {
      await this.boardRepository.delete(id);
    }
  }
}
