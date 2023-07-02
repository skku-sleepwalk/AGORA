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
import { UUID } from 'crypto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  getBoards(@Query('before') before: string, @Query('after') after: string) {
    return this.boardsService.getBoardAll({
      afterCursor: after,
      beforeCursor: before,
    });
  }
  @Get('/user/:userEmail')
  findByUser(@Param('userEmail') userEmail: string) {
    return this.boardsService.findByUser(userEmail);
  }

  @Get('/search')
  @UsePipes(ValidationPipe)
  findByCategory(
    @Query('queryData', new ParseArrayPipe({ items: String, separator: ',' }))
    queryData: [UUID, UUID, Order, string, string],
  ) {
    const cursor: Cursor = {
      afterCursor: queryData[0],
      beforeCursor: queryData[1],
    };
    const search: string = queryData[3];
    const order: Order = queryData[2];
    return this.boardsService.getBoards(
      queryData.slice(4),
      cursor,
      order,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
