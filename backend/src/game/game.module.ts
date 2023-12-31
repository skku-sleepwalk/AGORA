import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameBoardCategory } from 'src/entites/game/game.board.category.entity';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { GameBoardLike } from 'src/entites/game/game.board.like.entity';
import { GameCost } from 'src/entites/game/game.cost.entity';
import { GameGenre } from 'src/entites/game/game.genre.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';
import { GameReviewCommentLike } from 'src/entites/game/game.review.comment.like.entity';
import { GameReview } from 'src/entites/game/game.review.entity';
import { GameReviewLike } from 'src/entites/game/game.review.like.entity';
import { GameShoppingCartItem } from 'src/entites/game/game.shoppingCart.entity';
import { GameStore } from 'src/entites/game/game.store.entity';
import { GameTag } from 'src/entites/game/game.tag.entity';
import { GameTagRelation } from 'src/entites/game/game.tag.relation.entity';
import { GameStoreService } from './services/game.store.service';
import { GameStoresController } from './controllers/game.store.controller';
import { User } from 'src/entites/user.entity';
import { GameGenreService } from './services/game.genre.service';
import { GameTagService } from './services/game.tag.service';
import { GameGenreController } from './controllers/game.genre.controller';
import { GameTagController } from './controllers/game.tag.controller';
import { GameReviewController } from './controllers/game.review.controller';
import { GameReviewService } from './services/game.review.service';
import { GameReviewCommentService } from './services/game.review.comment.service';
import { GameReviewCommentController } from './controllers/game.review.comment.controller';
import { GameBoardService } from './services/game.board.service';
import { GameBoardController } from './controllers/game.board.controller';
import { GameBoardCategoryService } from './services/game.board.category.service';
import { GameBoardCategoryController } from './controllers/game.board.category.controller';
import { Game } from 'src/entites/game/game.entity';
import { GameService } from './services/game.service';
import { GameContorller } from './controllers/game.controller';
import { GameLike } from 'src/entites/game/game.like.entity';
import { GameReviewDislike } from 'src/entites/game/game.review.dislike.entity';
import { GameReviewCommentDislike } from 'src/entites/game/game.review.comment.dislike.entity';
import { GameLikeService } from './services/game.like.service';
import { GameLikeController } from './controllers/game.like.controller';
import { GameReviewLikeService } from './services/game.review.like.service';
import { GameReviewLikeController } from './controllers/game.review.like.controller';
import { GameReviewDislikeService } from './services/game.review.dislike.service';
import { GameReviewDislikeController } from './controllers/game.review.dislike.contorller';
import { GameReviewCommentLikeService } from './services/game.review.comment.like.service';
import { GameReviewCommentLikeController } from './controllers/game.review.comment.like.controller';
import { GameReviewCommentDislikeService } from './services/game.review.comment.dislike.service';
import { GameReviewCommentDislikeController } from './controllers/game.review.comment.dislike.controller';
import { GameBoardLikeService } from './services/game.board.like.service';
import { GameBoardLikeController } from './controllers/game.board.like.controller';
import { GamePlaytimeService } from './services/game.playtime.service';
import { GamePlaytimeController } from './controllers/game.playtime.controller';
import { GameInformation } from 'src/entites/game/game.information.entity';
import { GameTagRelationService } from './services/game.tag.relation.service';
import { GameTagRelationController } from './controllers/game.tag.relation.controller';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { GameBoardView } from 'src/entites/game/game.board.view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      GameInformation,
      GameStore,
      GameLike,
      GameTag,
      GameTagRelation,
      GameGenre,
      GameCost,
      GameReview,
      GameReviewDislike,
      GameReviewLike,
      GameReviewComment,
      GameReviewCommentLike,
      GameReviewCommentDislike,
      PlayTime,
      GameBoard,
      GameBoardCategory,
      GameBoardLike,
      GameBoardView,
      GameShoppingCartItem,
      User,
      UserSubscribe,
    ]),
  ],
  providers: [
    GameService,
    GameLikeService,
    GamePlaytimeService,
    GameStoreService,
    GameGenreService,
    GameTagService,
    GameTagRelationService,
    GameReviewService,
    GameReviewLikeService,
    GameReviewDislikeService,
    GameReviewCommentService,
    GameReviewCommentLikeService,
    GameReviewCommentDislikeService,
    GameBoardService,
    GameBoardLikeService,
    GameBoardCategoryService,
  ],
  controllers: [
    GameContorller,
    GameLikeController,
    GamePlaytimeController,
    GameStoresController,
    GameGenreController,
    GameTagController,
    GameTagRelationController,
    GameReviewController,
    GameReviewLikeController,
    GameReviewDislikeController,
    GameReviewCommentController,
    GameReviewCommentLikeController,
    GameReviewCommentDislikeController,
    GameBoardController,
    GameBoardLikeController,
    GameBoardCategoryController,
  ],
})
export class GameStoreModule {}
