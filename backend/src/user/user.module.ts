import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { UserSubscribeController } from './controllers/user.subscribe.controller';
import { UserSubscribeService } from './services/user.subscribe.service';
import { GameService } from 'src/game/services/game.service';
import { AssetService } from 'src/asset/services/asset.service';
import { Game } from 'src/entites/game/game.entity';
import { GameInformation } from 'src/entites/game/game.information.entity';
import { GameStore } from 'src/entites/game/game.store.entity';
import { GameLike } from 'src/entites/game/game.like.entity';
import { GameTag } from 'src/entites/game/game.tag.entity';
import { GameTagRelation } from 'src/entites/game/game.tag.relation.entity';
import { GameGenre } from 'src/entites/game/game.genre.entity';
import { GameCost } from 'src/entites/game/game.cost.entity';
import { GameReview } from 'src/entites/game/game.review.entity';
import { GameReviewDislike } from 'src/entites/game/game.review.dislike.entity';
import { GameReviewLike } from 'src/entites/game/game.review.like.entity';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';
import { GameReviewCommentLike } from 'src/entites/game/game.review.comment.like.entity';
import { GameReviewCommentDislike } from 'src/entites/game/game.review.comment.dislike.entity';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { GameBoardCategory } from 'src/entites/game/game.board.category.entity';
import { GameBoardLike } from 'src/entites/game/game.board.like.entity';
import { GameShoppingCartItem } from 'src/entites/game/game.shoppingCart.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetCost } from 'src/entites/asset/asset.cost.entity';
import { AssetCategory } from 'src/entites/asset/asset.category.entity';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';
import { AssetTagRelation } from 'src/entites/asset/asset.tag.relation.entity';
import { AssetSearchHistory } from 'src/entites/asset/asset.search.history.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReviewLike } from 'src/entites/asset/asset.review.like.entity';
import { AssetReviewDislike } from 'src/entites/asset/asset.review.dislike.entity';
import { AssetReviewCommentLike } from 'src/entites/asset/asset.review.comment.like.entity';
import { AssetReviewCommentDislike } from 'src/entites/asset/asset.review.comment.dislike.entity';
import { AssetBuyHistory } from 'src/entites/asset/asset.buy.history.entity';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscribe,
      PlayTime,
      Game,
      GameLike,
      Asset,
      AssetDownloadHistory,
    ]),
  ],
  providers: [UserService, UserSubscribeService],
  controllers: [UsersController, UserSubscribeController],
})
export class UsersModule {}
