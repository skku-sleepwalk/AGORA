import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameBoardCategoryService } from '../services/game.board.category.service';
import { CreateGameBoardCategoryDto } from '../dto/create.game.board.category.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game Board')
@Controller('game/board/category')
export class GameBoardCategoryController {
  constructor(private gameBoardCategoryService: GameBoardCategoryService) {}

  @ApiOperation({ summary: '카테고리 생성' })
  @Post()
  PostGameBoardCategory(@Body() data: CreateGameBoardCategoryDto) {
    return this.gameBoardCategoryService.postGameBoardCategory(data.name);
  }
}
