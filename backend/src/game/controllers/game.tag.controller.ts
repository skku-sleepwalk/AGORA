import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameTagDto } from '../dto/create.game.tag.dto';
import { GameTagService } from '../services/game.tag.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameTag')
@Controller('game/tag')
export class GameTagController {
  constructor(private gameTagService: GameTagService) {}

  @ApiOperation({ summary: '게임 태그 생성' })
  @Post()
  postGameStoreTag(@Body() data: CreateGameTagDto) {
    return this.gameTagService.postGameTag(data.name);
  }
}
