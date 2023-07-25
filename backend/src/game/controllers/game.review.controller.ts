import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameReviewDto } from '../dto/create.game.review.dto';
import { GameReviewService } from '../services/game.review.service';
import { GameReviewDto } from '../dto/game.review.dto';
import { UpdateGameReviewDto } from '../dto/update.game.review.dto';
import { LikeAction } from 'src/common/types/likeAction.type';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReview')
@Controller('game/:gameStoreId/review')
export class GameReviewController {
  constructor(private gameReviewService: GameReviewService) {}

  @ApiOperation({ summary: '리뷰 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  postGameReview(
    @Headers('Authorization') userEmail: string,
    @Param('gameStoreId') gameStoreId: string,
    @Body() data: CreateGameReviewDto,
  ) {
    return this.gameReviewService.postGameReview(
      userEmail,
      gameStoreId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '게임스토어에 해당하는 리뷰 가져오기' })
  @ApiResponse({ type: GameReviewDto })
  @ApiQuery({
    name: 'beforeCursor',
    description: '이전 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'afterCursor',
    description: '다음 페이지 커서(페이지네이션 옵션)',
  })
  @Get()
  getManyGameReview(
    @Param('gameStoreId') gameStoreId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.gameReviewService.getManyGameReview(
      { afterCursor, beforeCursor },
      gameStoreId,
    );
  }

  @ApiOperation({ summary: '게임스토어에 해당하는 리뷰 가져오기' })
  @ApiResponse({ type: GameReviewDto })
  @Get(':id')
  getOneGameReview(
    @Param('gameStoreId') gameStoreId: string,
    @Param('id') gameReviewId: string,
  ) {
    return this.gameReviewService.getOneGameReview(gameStoreId, gameReviewId);
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  updateGameReview(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewId: string,
    @Body() data: UpdateGameReviewDto,
  ) {
    return this.gameReviewService.updateGameReview(
      userEmail,
      gameReviewId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiQuery({
    name: 'likeAction',
    description: '좋아요 / 싫어요',
    example: 'like',
  })
  @Patch('/like/:id')
  likeGameReview(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewId: string,
    @Query('likeAction') likeAction: LikeAction,
  ) {
    return this.gameReviewService.likeGameReview(
      userEmail,
      gameReviewId,
      likeAction,
    );
  }

  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  deleteGameReview(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewId: string,
  ) {
    return this.gameReviewService.deleteGameReview(userEmail, gameReviewId);
  }
}
