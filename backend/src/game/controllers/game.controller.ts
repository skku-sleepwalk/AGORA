import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameService } from '../services/game.service';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameDto } from '../dto/create.game.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game')
@Controller('game')
export class Game {
  constructor(private gameService: GameService) {}
  @ApiOperation({ summary: '게시글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  postGame(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameDto,
  ) {
    return this.gameService.postGame(
      userEmail,
      data.title,
      data.downloadUrl,
      data.executablePath,
      data.genreNames,
    );
  }
}
