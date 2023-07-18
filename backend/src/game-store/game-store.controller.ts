import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreGenreDto } from './dto/create-game-genre.dto';

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

  @Post('genre')
  createGameStoreGenre(
    @Body() createGameStoreGenreDto: CreateGameStoreGenreDto,
  ) {
    return this.gameStoreService.createGameStoreGenre(createGameStoreGenreDto);
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

  @Post('boards/category')
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

  @Patch()
  update(
    @Query('id') id: string,
    @Body() updateGameStoreDto: UpdateGameStoreDto,
  ) {
    return this.gameStoreService.update(+id, updateGameStoreDto);
  }

  @Patch('/like')
  gameStoreLikeUpdate(
    @Headers('Authorization') userEmail: string,
    @Query('gameStoreId') gameStoreId: string,
  ) {
    return this.gameStoreService.gameStoreLikeUpdate(gameStoreId, userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameStoreService.remove(+id);
  }
}
