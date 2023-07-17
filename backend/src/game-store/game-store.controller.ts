import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';

@Controller('game-store')
export class GameStoreController {
  constructor(private readonly gameStoreService: GameStoreService) {}

  @Post()
  createGameStore(
    @Headers('authorization') authorEmail: string,
    @Body() createGameStoreDto: CreateGameStoreDto,
  ) {
    return this.gameStoreService.createGameStore(
      authorEmail,
      createGameStoreDto,
    );
  }

  @Post('boards')
  createGameStoreBoard(
    @Headers('authorization') writerEmail: string,
    @Body() createGameStoreBoardDto: CreateGameStoreBoardDto,
  ) {
    return this.gameStoreService.createGameStoreBoards(
      writerEmail,
      createGameStoreBoardDto,
    );
  }

  @Post('category')
  createGameStoreBoardCategory(
    @Body() createGameStoreBoardCategoryDto: CreateGameStoreBoardCategoryDto,
  ) {
    return this.gameStoreService.createGameStoreBoardCategory(
      createGameStoreBoardCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.gameStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameStoreService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameStoreDto: UpdateGameStoreDto,
  ) {
    return this.gameStoreService.update(+id, updateGameStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameStoreService.remove(+id);
  }
}
