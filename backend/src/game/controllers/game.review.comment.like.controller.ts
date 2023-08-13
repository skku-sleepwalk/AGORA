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
import { GameReviewCommentLikeService } from '../services/game.review.comment.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReviewComment')
@Controller('game/:gameId/review/:reviewId/comment/:commentId/like')
export class GameReviewCommentLikeController {
  constructor(
    private gameReviewCommentLikeService: GameReviewCommentLikeService,
  ) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Post()
  PostGameReviewCommentLike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    // @Param('commentId') commentId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
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
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
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
