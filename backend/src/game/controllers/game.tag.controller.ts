import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameTagDto } from '../dto/create.game.tag.dto';
import { GameTagService } from '../services/game.tag.service';
import { GameTagDto } from '../dto/game.tag.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameTag')
@Controller('game/tag')
export class GameTagController {
  constructor(private gameTagService: GameTagService) {}

  @ApiOperation({ summary: '게임 태그 생성' })
  @Post()
  PostGameTag(@Body() data: CreateGameTagDto) {
    return this.gameTagService.postGameTag(data.name);
  }

  @ApiOperation({ summary: '게임 태그 검색' })
  @ApiResponse({ type: GameTagDto })
  @ApiQuery({ name: 'q', description: '검색 내용' })
  @Get('search')
  searchGameTag(@Query('q') search: string) {
    return this.gameTagService.searchGameTag(search);
  }
}
