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
import { AssetSearchHistory } from 'src/entites/asset/asset.search.history.entity';
import { AssetController } from './controllers/asset.controller';
import { AssetCategory } from 'src/entites/asset/asset.category.entity';
import { AssetCategoryController } from './controllers/asset.category.controller';
import { AssetCategoryService } from './services/asset.category.service';
import { AssetLikeController } from './controllers/asset.like.controller';
import { AssetLikeService } from './services/asset.like.service';
import { AssetTagController } from './controllers/asset.tag.controller';
import { AssetTagService } from './services/asset.tag.service';
import { AssetTagRelationController } from './controllers/asset.tag.relation.controller';
import { AssetTagRelationService } from './services/asset.tag.relation.service';
import { AssetReviewController } from './controllers/asset.review.controller';
import { AssetReviewService } from './services/asset.review.service';
import { AssetReviewLikeController } from './controllers/asset.review.like.controller';
import { AssetReviewLikeService } from './services/asset.review.like.service';
import { AssetReviewDisikeController } from './controllers/asset.review.dislike.controller';
import { AssetReviewDislikeService } from './services/asset.review.dislike.service';
import { AssetReviewCommentController } from './controllers/asset.review.comment.controller';
import { AssetReviewCommentService } from './services/asset.review.comment.service';
import { AssetReviewCommentLikeController } from './controllers/asset.review.comment.like.controller';
import { AssetReviewCommentDislikeController } from './controllers/asset.review.comment.dislike.controller';
import { AssetReviewCommentLikeService } from './services/asset.review.comment.like.service';
import { AssetReviewCommentDislikeService } from './services/asset.review.comment.dislike.service';
import { AssetBuyHistory } from 'src/entites/asset/asset.buy.history.entity';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';
import { AssetSearchHistoryController } from './controllers/asset.search.history.controller';
import { AssetSearchHistoryService } from './services/asset.search.history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Asset,
      AssetCost,
      AssetCategory,
      AssetLike,
      AssetTag,
      AssetTagRelation,
      AssetSearchHistory,
      AssetReview,
      AssetReviewComment,
      AssetReviewLike,
      AssetReviewDislike,
      AssetReviewCommentLike,
      AssetReviewCommentDislike,
      AssetBuyHistory,
      AssetDownloadHistory,
    ]),
  ],
  controllers: [
    AssetController,
    AssetCategoryController,
    AssetLikeController,
    AssetTagController,
    AssetTagRelationController,
    AssetReviewController,
    AssetReviewLikeController,
    AssetReviewDisikeController,
    AssetReviewCommentController,
    AssetReviewCommentLikeController,
    AssetReviewCommentDislikeController,
    AssetSearchHistoryController,
  ],
  providers: [
    AssetService,
    AssetCategoryService,
    AssetLikeService,
    AssetTagService,
    AssetTagRelationService,
    AssetReviewService,
    AssetReviewLikeService,
    AssetReviewDislikeService,
    AssetReviewCommentService,
    AssetReviewCommentLikeService,
    AssetReviewCommentDislikeService,
    AssetSearchHistoryService,
  ],
})
export class AssetModule {}
