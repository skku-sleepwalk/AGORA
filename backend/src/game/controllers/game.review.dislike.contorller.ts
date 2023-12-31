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
import { GameReviewDislikeService } from '../services/game.review.dislike.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReview')
@Controller('game/:gameId/review/:reviewId/dislike')
export class GameReviewDislikeController {
  constructor(private gameReviewDislikeService: GameReviewDislikeService) {}

  @ApiOperation({ summary: '싫어요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  PostGameReviewDislike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.gameReviewDislikeService.postGameReviewDislike(
      userEmail,
      gameId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '싫어요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Delete()
  DeleteGameReviewDislike(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.gameReviewDislikeService.deleteGameReviewDislike(
      userEmail,
      gameId,
      reviewId,
    );
  }
}
