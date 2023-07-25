import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameBoardCategoryService } from '../services/game.board.category.service';
import { CreateGameBoardCategoryDto } from '../dto/create.game.board.category.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game Board')
@Controller('game/board/category')
export class GameBoardCategoryController {
  constructor(private gameBoardCategoryService: GameBoardCategoryService) {}

  @ApiOperation({ summary: '카테고리 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameBoardCategory(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameBoardCategoryDto,
  ) {
    return this.gameBoardCategoryService.postGameBoardCategory(
      userEmail,
      data.name,
    );
  }
}
