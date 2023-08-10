import {
  Body,
  Controller,
  Headers,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GamePlaytimeService } from '../services/game.playtime.service';
import { UpdateGamePlaytimeDto } from '../dto/update.game.playtime.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('PlayTime')
@Controller('game/:gameId/playtime')
export class GamePlaytimeController {
  constructor(private readonly gamePlaytimeService: GamePlaytimeService) {}
  @ApiOperation({ summary: '플레이타임 업데이트' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch()
  updatePlaytime(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: UpdateGamePlaytimeDto,
  ) {
    return this.gamePlaytimeService.updatePlaytime(
      userEmail,
      gameId,
      data.additionalPlaytime,
    );
  }
}
