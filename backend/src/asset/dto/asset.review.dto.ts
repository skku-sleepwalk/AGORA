import { PickType } from '@nestjs/swagger';
import { AssetReview } from 'src/entites/asset/asset.review.entity';

export class AssetReviewDto extends PickType(AssetReview, [
  'id',
  'author',
  'content',
  'rating',
]) {}
