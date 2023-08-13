import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameTagRelationService } from '../services/game.tag.relation.service';
import { CreateGameTagRelationsDto } from '../dto/create.game.tag.relation.dto';
import { GameTagRelationDto } from '../dto/game.tag.relation.dto';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiHeader({ name: 'Authorization', description: '유저 이메일' })
@ApiTags('GameTag')
@Controller('game/:gameId/tag')
export class GameTagRelationController {
  constructor(private gameTagRelationService: GameTagRelationService) {}

  @ApiOperation({ summary: '게임 태그 관계 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameTagRelation(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @Body() data: CreateGameTagRelationsDto,
  ) {
    return this.gameTagRelationService.postGameTagRelation(
      userEmail,
      gameId,
      data.tagName,
    );
  }

  @ApiOperation({ summary: '유저가 추가한 게임 태그 조회' })
  @ApiResponse({ type: GameTagRelationDto, isArray: true })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @Get()
  GetGameTagRelationsByUser(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
  ) {
    if (!gameId) throw new BadRequestException('gameId를 입력해주세요.');
    if (!userEmail) throw new BadRequestException('userEmail을 입력해주세요.');
    return this.gameTagRelationService.getGameTagRelation(userEmail, gameId);
  }

  @ApiOperation({ summary: '게임 태그 관계 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':relationId')
  DeleteGameTagRelation(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('relationId') relationId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('relationId') relationId: string,
  ) {
    console.log(userEmail, gameId, relationId);
    return this.gameTagRelationService.deleteGameTagRelation(
      userEmail,
      gameId,
      relationId,
    );
  }
}
