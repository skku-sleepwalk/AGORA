import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  ParseArrayPipe,
  Headers,
} from '@nestjs/common';
import { BoardsService } from './developer-community-boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardType, Order } from './entities/developer-community-board.entity';
import { Cursor } from 'typeorm-cursor-pagination';

@Controller('developer-community-boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Headers('Authorization') writerEmail: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardsService.createBoard(writerEmail, createBoardDto);
  }

  @Get('/main')
  getBoards(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('order') order: Order,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    return this.boardsService.getBoard(
      {
        afterCursor,
        beforeCursor,
      },
      order,
      categoryNames,
    );
  }
  @Get('/user/:userEmail')
  findByUser(@Param('userEmail') userEmail: string) {
    return this.boardsService.findByUser(userEmail);
  }

  @Get('/search')
  searchBoard(
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('order') order: Order,
    @Query('search') search: string,
    @Query('boardType') boardType: BoardType,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    const cursor: Cursor = {
      afterCursor,
      beforeCursor,
    };
    return this.boardsService.searhBoards(
      categoryNames,
      cursor,
      order,
      search,
      boardType,
    );
  }

  @Get('/getChild/:parentId')
  getChild(
    @Param('parentId') parentId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('order') order: Order,
  ) {
    return this.boardsService.getChild(
      parentId,
      { afterCursor, beforeCursor },
      order,
    );
  }

  @Get('/id/:id')
  getOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch('/update')
  @UsePipes(ValidationPipe)
  update(
    @Headers('Authorization') userEmail: string,
    @Query('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto, userEmail);
  }

  @Patch('/like')
  likeUpdate(
    @Headers('Authorization') userEmail: string,
    @Query('boardId') boardId: string,
  ) {
    return this.boardsService.likeUpdate(boardId, userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove('a@gmail.com', id);
  }
}
