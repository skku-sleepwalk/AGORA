import { ApiProperty, PickType } from '@nestjs/swagger';
import { AssetReview } from 'src/entites/asset/asset.review.entity';

export class AssetReviewDto extends PickType(AssetReview, [
  'id',
  'author',
  'content',
  'rating',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ description: '좋아요 수', example: 0 })
  likeCount: number;

  @ApiProperty({ description: '싫어요 수', example: 0 })
  dislikeCount: number;

  @ApiProperty({ description: '좋아요 여부', example: false })
  like: boolean;

  @ApiProperty({ description: '싫어요 여부', example: false })
  dislike: boolean;
}
