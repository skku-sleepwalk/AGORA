import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameGenreService } from '../services/game.genre.service';
import { CreateGameGenreDto } from '../dto/create.game.genre.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameGenre')
@Controller('game/genre')
export class GameGenreController {
  constructor(private gameGenreService: GameGenreService) {}

  @ApiOperation({ summary: '게임 장르 생성' })
  @Post()
  postGameStoreGenre(@Body() data: CreateGameGenreDto) {
    return this.gameGenreService.postGameGenre(data.name);
  }
}
