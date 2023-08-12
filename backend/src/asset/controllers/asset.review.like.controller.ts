import { Controller, Delete, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetReviewLikeService } from '../services/asset.review.like.service';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';

@ApiTags('AssetReview')
@Controller('asset/:assetId/review/:reviewId/like')
export class AssetReviewLikeController {
  constructor(
    private readonly assetReviewLikeService: AssetReviewLikeService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  likeAssetReview(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewLikeService.likeAssetReview(
      userEmail,
      assetId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 좋아요 취소' })
  @Delete()
  deleteAssetReviewLike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewLikeService.deleteAssetReviewLike(
      userEmail,
      assetId,
      reviewId,
    );
  }
}
