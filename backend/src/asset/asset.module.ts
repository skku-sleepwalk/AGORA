import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetReviewCommentDislike } from 'src/entites/asset/asset.review.comment.dislike.entity';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReviewCommentLike } from 'src/entites/asset/asset.review.comment.like.entity';
import { AssetReviewDislike } from 'src/entites/asset/asset.review.dislike.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { AssetReviewLike } from 'src/entites/asset/asset.review.like.entity';
import { AssetService } from './services/asset.service';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';
import { AssetTagRelation } from 'src/entites/asset/asset.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { AssetCost } from 'src/entites/asset/asset.cost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Asset,
      AssetCost,
      AssetLike,
      AssetTag,
      AssetTagRelation,
      AssetReview,
      AssetReviewComment,
      AssetReviewLike,
      AssetReviewDislike,
      AssetReviewCommentLike,
      AssetReviewCommentDislike,
    ]),
  ],
  controllers: [],
  providers: [AssetService],
})
export class AssetModule {}
