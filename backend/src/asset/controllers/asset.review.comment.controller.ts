import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AssetReviewCommentService } from '../services/asset.review.comment.service';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { CreateGameReviewCommentDto } from 'src/game/dto/create.game.review.comment.dto';
import { CursoredAssetReviewCommentDto } from 'src/common/dto/cursoredData.dto';

@ApiTags('AssetReviewComment')
@Controller('asset/:assetId/review/:reviewId/comment')
export class AssetReviewCommentController {
  constructor(
    private readonly assetReviewCommentService: AssetReviewCommentService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 댓글 작성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  createAssetReviewComment(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @Body() data: CreateGameReviewCommentDto,
  ) {
    return this.assetReviewCommentService.createAssetReviewComment(
      userEmail,
      assetId,
      reviewId,
      data.content,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 댓글 조회' })
  @ApiResponse({ type: CursoredAssetReviewCommentDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @Get()
  getAssetReviewComments(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.assetReviewCommentService.getAssetReviewComments(
      userEmail,
      { afterCursor, beforeCursor },
      assetId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 댓글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Patch(':commentId')
  updateAssetReviewComment(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
    @Body() data: CreateGameReviewCommentDto,
  ) {
    return this.assetReviewCommentService.updateAssetReviewComment(
      userEmail,
      assetId,
      reviewId,
      commentId,
      data.content,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 댓글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Delete(':commentId')
  deleteAssetReviewComment(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return this.assetReviewCommentService.deleteAssetReviewComment(
      userEmail,
      assetId,
      reviewId,
      commentId,
    );
  }
}
