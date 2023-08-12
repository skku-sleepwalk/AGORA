import { PickType } from '@nestjs/swagger';
import { AssetReview } from 'src/entites/asset/asset.review.entity';

export class CreateAssetReviewDto extends PickType(AssetReview, [
  'content',
  'rating',
]) {}
