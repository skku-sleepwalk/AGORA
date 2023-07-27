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
import { GameReviewCommentDislikeService } from '../services/game.review.comment.dislike.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReviewComment')
@Controller('game/:gameId/review/:reviewId/comment/:commentId/dislike')
export class GameReviewCommentDislikeController {
  constructor(
    private gameReviewCommentDislikeService: GameReviewCommentDislikeService,
  ) {}

  @ApiOperation({ summary: '싫어요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameReviewCommentDislike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.gameReviewCommentDislikeService.postGameReviewCommentDislike(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }

  @ApiOperation({ summary: '싫어요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteGameReviewCommentDislike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.gameReviewCommentDislikeService.deleteGameReviewCommentDislike(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }
}
