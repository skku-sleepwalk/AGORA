import {
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameLikeService } from '../services/game.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game')
@Controller('game/:gameId/like')
export class GameLikeController {
  constructor(private gameLikeService: GameLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @Post()
  postGameLike(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
  ) {
    return this.gameLikeService.postGameLike(userEmail, gameId);
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @Delete()
  deleteGameLike(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
  ) {
    return this.gameLikeService.deleteGameLike(userEmail, gameId);
  }
}
