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
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameReviewCommentService } from '../services/game.review.comment.service';
import { CreateGameReviewCommentDto } from '../dto/create.game.review.comment.dto';
import { UpdateGameReviewCommentDto } from '../dto/update.game.review.comment.dto';
import { GameReviewCommentDto } from '../dto/game.review.comment.dto';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReviewComment')
@Controller('game/:gameId/review/:reviewId/comment')
export class GameReviewCommentController {
  constructor(private gameReviewCommentService: GameReviewCommentService) {}

  @ApiOperation({ summary: '리뷰 댓글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  postGameReviewComment(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UuidParam('reviewId') reviewId: string,
    @Body() data: CreateGameReviewCommentDto,
  ) {
    return this.gameReviewCommentService.postGameReviewComment(
      userEmail,
      gameId,
      reviewId,
      data.content,
    );
  }

  @ApiOperation({ summary: '리뷰에 해당하는 댓글 가져오기' })
  @ApiResponse({ type: GameReviewCommentDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
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
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UuidParam('reviewId') reviewId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.gameReviewCommentService.getManyGameReviewComment(
      userEmail,
      { afterCursor, beforeCursor },
      gameId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '리뷰 댓글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Patch(':commentId')
  updateGameReviewComment(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UuidParam('reviewId') reviewId: string,
    // @Param('commentId') commentId: string,
    @UuidParam('commentId') commentId: string,
    @Body() data: UpdateGameReviewCommentDto,
  ) {
    return this.gameReviewCommentService.updateGameReviewComment(
      userEmail,
      gameId,
      reviewId,
      commentId,
      data.content,
    );
  }

  @ApiOperation({ summary: '리뷰 댓글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Delete(':commentId')
  deleteGameReviewComment(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    // @Param('commentId') commentId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return this.gameReviewCommentService.deleteGameReviewComment(
      userEmail,
      gameId,
      reviewId,
      commentId,
    );
  }
}
