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
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameReviewCommentService } from '../services/game.review.comment.service';
import { CreateGameReviewCommentDto } from '../dto/create.game.review.comment.dto';
import { GameReviewDto } from '../dto/game.review.dto';
import { UpdateGameReviewCommentDto } from '../dto/update.game.review.comment.dto';
import { LikeAction } from 'src/common/types/likeAction.type';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game Review Comment')
@Controller('game/:gameStoreId/review/:GameReviewId/comment')
export class GameReviewCommentController {
  constructor(private gameReviewCommentService: GameReviewCommentService) {}

  @ApiOperation({ summary: '리뷰 댓글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  postGameReviewComment(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameReviewCommentDto,
  ) {
    return this.gameReviewCommentService.postGameReviewComment(
      userEmail,
      data.reviewId,
      data.content,
    );
  }

  @ApiOperation({ summary: '리뷰에 해당하는 댓글 가져오기' })
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
  getManyGameReviewComment(
    @Param('GameReviewId') gameReviewCommentId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.gameReviewCommentService.getManyGameReviewComment(
      { afterCursor, beforeCursor },
      gameReviewCommentId,
    );
  }

  @ApiOperation({ summary: '리뷰 댓글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  updateGameReviewComment(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewCommentId: string,
    @Body() data: UpdateGameReviewCommentDto,
  ) {
    return this.gameReviewCommentService.updateGameReviewComment(
      userEmail,
      gameReviewCommentId,
      data.content,
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
  likeGameReviewComment(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewCommentId: string,
    @Query('likeAction') likeAction: LikeAction,
  ) {
    return this.gameReviewCommentService.likeGameReviewComment(
      userEmail,
      gameReviewCommentId,
      likeAction,
    );
  }

  @ApiOperation({ summary: '리뷰 댓글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  deleteGameReviewComment(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameReviewCommentId: string,
  ) {
    return this.gameReviewCommentService.deleteGameReviewComment(
      userEmail,
      gameReviewCommentId,
    );
  }
}
