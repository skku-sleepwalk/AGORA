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
import { GameReviewCommentDislikeService } from '../services/game.review.comment.dislike.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReviewComment')
@Controller('game/:gameId/review/:reviewId/comment/:commentId/dislike')
export class GameReviewCommentDislikeController {
  constructor(
    private gameReviewCommentDislikeService: GameReviewCommentDislikeService,
  ) {}

  @ApiOperation({ summary: '싫어요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Post()
  PostGameReviewCommentDislike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    // @Param('commentId') commentId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
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
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Delete()
  DeleteGameReviewCommentDislike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    // @Param('commentId') commentId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return this.gameReviewCommentDislikeService.deleteGameReviewCommentDislike(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }
}
