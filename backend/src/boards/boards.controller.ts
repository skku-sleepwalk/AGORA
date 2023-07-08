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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Order } from './entities/board.entity';
import { Cursor } from 'typeorm-cursor-pagination';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/main')
  getBoards(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
  ) {
    return this.boardsService.getBoard({
      afterCursor,
      beforeCursor,
    });
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
    return this.boardsService.searhBoards(categoryNames, cursor, order, search);
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

  @Get('/email/:email')
  findOne(@Param('email') writerEmail: string) {
    return this.boardsService.findByUser(writerEmail);
  }

  @Get('/id/:id')
  getOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch('/id')
  @UsePipes(ValidationPipe)
  update(@Query('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Patch('/like')
  likeUpdate(
    @Query('boardId') boardId: string,
    @Query('userId') userId: string,
  ) {
    return this.boardsService.likeUpdate(boardId, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
