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
import { GameReviewLikeService } from '../services/game.review.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReview')
@Controller('game/:gameId/review/:reviewId/like')
export class GameReviewLikeController {
  constructor(private gameReviewLikeService: GameReviewLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  PostGameReviewLike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.gameReviewLikeService.postGameReviewLike(
      userEmail,
      gameId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteGameReviewLike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.gameReviewLikeService.deleteGameReviewLike(
      userEmail,
      gameId,
      reviewId,
    );
  }
}
