import { Controller, Delete, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetReviewCommentLikeService } from '../services/asset.review.comment.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@ApiTags('AssetReviewComment')
@Controller('asset/:assetId/review/:reviewId/comment/:commentId/like')
export class AssetReviewCommentLikeController {
  constructor(
    private readonly assetReviewCommentLikeService: AssetReviewCommentLikeService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 댓글 좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Post()
  async createLike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return await this.assetReviewCommentLikeService.createLike(
      userEmail,
      assetId,
      reviewId,
      commentId,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 댓글 좋아요 취소' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiParam({ name: 'commentId', description: '댓글 아이디' })
  @Delete()
  async deleteLike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return await this.assetReviewCommentLikeService.deleteLike(
      userEmail,
      assetId,
      reviewId,
      commentId,
    );
  }
}
