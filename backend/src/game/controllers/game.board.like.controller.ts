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
import { GameBoardLikeService } from '../services/game.board.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameBoard')
@Controller('game/:gameId/board/:boardId/like')
export class GameBoardLikeController {
  constructor(private gameBoardLikeService: GameBoardLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'boardId', description: '게시글 아이디' })
  @Post()
  PostGameBoardLike(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    // @Param('boardId') boardId: string,
    @UuidParam('boardId') boardId: string,
  ) {
    return this.gameBoardLikeService.postGameBoardLike(
      userEmail,
      gameId,
      boardId,
    );
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'boardId', description: '게시글 아이디' })
  @Delete()
  DeleteGameBoardLike(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    // @Param('boardId') boardId: string,
    @UuidParam('boardId') boardId: string,
  ) {
    return this.gameBoardLikeService.deleteGameBoardLike(
      userEmail,
      gameId,
      boardId,
    );
  }
}
