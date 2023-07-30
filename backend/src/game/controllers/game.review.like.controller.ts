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
import { GameReviewLikeService } from '../services/game.review.like.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReview')
@Controller('game/:gameId/review/:reviewId/like')
export class GameReviewLikeController {
  constructor(private gameReviewLikeService: GameReviewLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameReviewLike(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
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
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.gameReviewLikeService.deleteGameReviewLike(
      userEmail,
      gameId,
      reviewId,
    );
  }
}
