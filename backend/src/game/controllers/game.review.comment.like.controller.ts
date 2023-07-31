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
import { GameReviewCommentLikeService } from '../services/game.review.comment.like.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReviewComment')
@Controller('game/:gameId/review/:reviewId/comment/:commentId/like')
export class GameReviewCommentLikeController {
  constructor(
    private gameReviewCommentLikeService: GameReviewCommentLikeService,
  ) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameReviewCommentLike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.gameReviewCommentLikeService.postGameReviewCommentLike(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteGameReviewCommentLike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.gameReviewCommentLikeService.deleteGameReviewCommentLike(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }
}
