import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetReviewDislikeService } from '../services/asset.review.dislike.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { Controller, Delete, Post } from '@nestjs/common';

@ApiTags('AssetReview')
@Controller('asset/:assetId/review/:reviewId/dislike')
export class AssetReviewDisikeController {
  constructor(
    private readonly assetReviewDislikeService: AssetReviewDislikeService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 싫어요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Post()
  dislikeAssetReview(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewDislikeService.dislikeAssetReview(
      userEmail,
      assetId,
      reviewId,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 싫어요 취소' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Delete()
  deleteAssetReviewDislike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewDislikeService.deleteAssetReviewDislike(
      userEmail,
      assetId,
      reviewId,
    );
  }
}
