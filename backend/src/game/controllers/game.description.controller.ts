import {
  Body,
  Controller,
  Headers,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameDescriptionDto } from '../dto/create.game.description.dto';
import { GameDescriptionService } from '../services/game.description.service';
import { UpdateGameDescriptionDto } from '../dto/update.game.description.dto';
import { GameDescriptionDto } from '../dto/game.description.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameDescription')
@Controller('game/:gameId/description')
export class GameDescriptionController {
  constructor(private gameDescriptionService: GameDescriptionService) {}

  @ApiOperation({ description: '게임 설명 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameDescription(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: CreateGameDescriptionDto,
  ) {
    this.gameDescriptionService.postGameDescription(
      userEmail,
      gameId,
      data.content,
    );
  }

  @ApiOperation({ description: '게임 설명 수정' })
  @ApiResponse({ type: GameDescriptionDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':gameDescriptionId')
  patchGameDescription(
    @Headers('Authorization') userEmail: string,
    @Param('gameDescriptionId') gameDescriptionId: string,
    @Body() data: UpdateGameDescriptionDto,
  ) {
    this.gameDescriptionService.patchGameDescription(
      userEmail,
      gameDescriptionId,
      data.content,
    );
  }
}
