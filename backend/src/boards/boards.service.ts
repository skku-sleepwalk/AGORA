import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, Order } from './entities/board.entity';
import { BoardRepository } from './boards.repository';
import { CategoryService } from './category/category.service';
import { UsersService } from 'src/users/users.service';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CategoryTypeRepository } from './category/category.repository';

@Injectable()
export class BoardsService {
  private readonly boardRepository: BoardRepository;
  private readonly categoryTypeRepository: CategoryTypeRepository;
  constructor(
    private readonly categoryService: CategoryService,
    private readonly usersService: UsersService,
    private readonly connection: Connection,
  ) {
    this.boardRepository = connection.getCustomRepository(BoardRepository);
    this.categoryTypeRepository = connection.getCustomRepository(
      CategoryTypeRepository,
    );
  }

  private paginateOption: PaginationOptions<Board> = {
    entity: Board,
    paginationKeys: ['_id'],
    query: {
      limit: 5,
      order: 'DESC',
    },
  };

  ///////////////////////////{  CREATE  }/////////////////////////////////
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, content, writerEmail, parentId, categoryNames } =
      createBoardDto;

    // User check
    const user = await this.usersService.findByEmail(writerEmail);
    const id = uuid();
    if (user === undefined) {
      const _error = { writerEmail: 'BoardInput is not valid check type' };
      throw new HttpException(
        { message: 'Input data is not exist', _error },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Parent check
    if (parentId != undefined) {
      let parent = await this.boardRepository.findOne(parentId);
      if (parent === undefined) {
        const _error = { parentId: 'No board exist with id' };
        throw new HttpException(
          { message: 'Input data is not exist', _error },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        while (true) {
          parent.child += 1;
          this.boardRepository.save(parent);
          if (parent.parentId === null) {
            break;
          }
          parent = await this.boardRepository.findOne(parent.parentId);
        }
      }
    }

    const newBoard = this.boardRepository.create({
      id: id,
      writerEmail,
      parentId,
      title,
      content,
      categoryNames,
    });

    for (const categoryName of categoryNames) {
      const categoryType = await this.categoryTypeRepository.findOne({
        name: categoryName,
      });

      categoryType.boardIds.push(id);
      this.categoryTypeRepository.save(categoryType);
    }

    return this.boardRepository.save(newBoard);
  }
  ///////////////////////////{  READ  }/////////////////////////////////
  async getBoardAll(_cursor: Cursor) {
    const queryBuilder = this.boardRepository
      .createQueryBuilder('board')
      .where('board.parentId IS NULL');
    const paginateOption = this.paginateOption;
    if (_cursor.afterCursor != null) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor != null) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  findOne(id: string) {
    return this.boardRepository.findOne(id);
  }

  async getBoards(
    categoryTypeNames: Array<string>,
    _cursor: Cursor,
    order: Order,
    search: string,
  ) {
    const boardIds: Array<string> = [];

    for (const categoryTypeName of categoryTypeNames) {
      boardIds.push(
        ...(
          await this.categoryTypeRepository.findOne({ name: categoryTypeName })
        ).boardIds,
      );
    }

    let queryBuilder = this.boardRepository.createQueryBuilder('board');
    if (search) {
      queryBuilder = queryBuilder.where('board.parentId IS NULL'); //검색 구현 아직 안됨.
    } else {
      queryBuilder = queryBuilder.whereInIds(boardIds);
    }
    const paginateOption = this.paginateOption;
    this.paginateOption.paginationKeys = [order, '_id'];
    if (_cursor.afterCursor != null) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor != null) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  async findByUser(Email: string) {
    return this.boardRepository.find({ writerEmail: Email });
  }

  ///////////////////////////{  UPDATE  }/////////////////////////////////
  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const toUpdateBoard = await this.findOne(id);
    const { updateEmail, title, content } = updateBoardDto;

    if (updateEmail === toUpdateBoard.writerEmail) {
      toUpdateBoard.title = title;
      toUpdateBoard.content = content;
      toUpdateBoard.updatedAt = new Date();
      return await this.boardRepository.save(toUpdateBoard);
    } else {
      throw new HttpException(
        { message: 'Not a writter error' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  ///////////////////////////{  DELETE  }/////////////////////////////////
  async remove(id: string) {
    await this.boardRepository.delete(id);
  }
  //////////////////////////////////////////////////////////////////////
  async paginate(_cursor: Cursor, limit: number) {
    const queryBuilder = this.boardRepository
      .createQueryBuilder('board')
      .where('board.parent IS NULL')
      .where('board.writerEmail = :writerEmail', {
        writerEmail: 'a@gmail.com',
      });

    const paginateOption: PaginationOptions<Board> = {
      entity: Board,
      paginationKeys: ['_id'],
      query: {
        limit,
        order: 'DESC',
      },
    };

    if (_cursor.afterCursor != null) {
      paginateOption.query.afterCursor = _cursor.afterCursor;
    }
    if (_cursor.beforeCursor != null) {
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    }

    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);

    return { data, cursor };
  }
}
