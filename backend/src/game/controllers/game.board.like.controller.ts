import {
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameBoardLikeService } from '../services/game.board.like.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameBoard')
@Controller('game/:gameId/board/:boardId/like')
export class GameBoardLikeController {
  constructor(private gameBoardLikeService: GameBoardLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameBoardLike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('boardId') boardId: string,
  ) {
    return this.gameBoardLikeService.postGameBoardLike(
      userEmail,
      gameId,
      boardId,
    );
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteGameBoardLike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('boardId') boardId: string,
  ) {
    return this.gameBoardLikeService.deleteGameBoardLike(
      userEmail,
      gameId,
      boardId,
    );
  }
}
