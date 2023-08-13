import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssetReviewCommentDislikeService } from '../services/asset.review.comment.dislike.service';
import { Controller, Delete, Post } from '@nestjs/common';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@ApiTags('AssetReviewComment')
@Controller('asset/:assetId/review/:reviewId/comment/:commentId/dislike')
export class AssetReviewCommentDislikeController {
  constructor(
    private readonly assetReviewCommentDislikeService: AssetReviewCommentDislikeService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 댓글 싫어요' })
  @Post()
  async createDislike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return await this.assetReviewCommentDislikeService.createDislike(
      userEmail,
      assetId,
      reviewId,
      commentId,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 댓글 싫어요 취소' })
  @Delete()
  async deleteDislike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @UuidParam('commentId') commentId: string,
  ) {
    return await this.assetReviewCommentDislikeService.deleteDislike(
      userEmail,
      assetId,
      reviewId,
      commentId,
    );
  }
}
