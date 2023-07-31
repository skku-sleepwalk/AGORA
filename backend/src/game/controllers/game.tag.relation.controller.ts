import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameTagRelationService } from '../services/game.tag.relation.service';
import { CreateGameTagRelationsDto } from '../dto/create.game.tag.relation.dto';
import { GameTagRelationDto } from '../dto/game.tag.relation.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiHeader({ name: 'Authorization', description: '유저 이메일' })
@ApiTags('GameTag')
@Controller('game/:gameId/tag')
export class GameTagController {
  constructor(private gameTagRelationService: GameTagRelationService) {}

  @ApiOperation({ summary: '게임 태그 관계 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameTagRelation(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: CreateGameTagRelationsDto,
  ) {
    return this.gameTagRelationService.postGameTagRelation(
      userEmail,
      gameId,
      data.tagName,
    );
  }

  @ApiOperation({ summary: '게임 태그 조회' })
  @ApiResponse({ type: GameTagRelationDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Get()
  GetGameTagRelationsByUser(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
  ) {
    return this.gameTagRelationService.getGameTagRelation(userEmail, gameId);
  }

  @ApiOperation({ summary: '게임 태그 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete('search')
  DeleteGameTagRelation(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('relationId') relationId: string,
  ) {
    this.gameTagRelationService.deleteGameTagRelation(
      userEmail,
      gameId,
      relationId,
    );
  }
}
