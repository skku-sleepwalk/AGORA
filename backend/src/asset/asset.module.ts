import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetReviewCommentDislike } from 'src/entites/asset/asset.review.comment.dislike.entity';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReviewCommentLike } from 'src/entites/asset/asset.review.comment.like.entity';
import { AssetReviewDislike } from 'src/entites/asset/asset.review.dislike.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { AssetReviewLike } from 'src/entites/asset/asset.review.like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asset,
      AssetReview,
      AssetReviewComment,
      AssetReviewLike,
      AssetReviewDislike,
      AssetReviewCommentLike,
      AssetReviewCommentDislike,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AssetModule {}
