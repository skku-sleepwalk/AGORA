import { PickType } from "@nestjs/swagger";
import { AssetReviewComment } from "src/entites/asset/asset.review.comment.entity";

export class CreateAssetReviewCommentDto extends PickType(AssetReviewComment, [
  'content',
])