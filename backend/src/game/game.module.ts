import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameBoardCategory } from 'src/entites/game.board.category.entity';
import { GameBoard } from 'src/entites/game.board.entity';
import { GameBoardLikeRelation } from 'src/entites/game.board.like.relation.entity';
import { GameCost } from 'src/entites/game.cost.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { PlayTimeRelation } from 'src/entites/game.playtime.relation.entity';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';
import { GameReviewCommentLikeRelation } from 'src/entites/game.review.comment.like.relation';
import { GameReview } from 'src/entites/game.review.entity';
import { GameReviewLikeRelation } from 'src/entites/game.review.like.relation';
import { GameShoppingCartItem } from 'src/entites/game.shoppingCart.entity';
import { GameStore } from 'src/entites/game.store.entity';
import { GameTag } from 'src/entites/game.tag.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
import { GameStoresService } from './services/game.store.service';
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
import { Game } from 'src/entites/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      GameStore,
      GameTag,
      GameTagRelation,
      GameGenre,
      GameCost,
      GameReview,
      GameReviewComment,
      GameReviewLikeRelation,
      GameReviewCommentLikeRelation,
      PlayTimeRelation,
      GameBoard,
      GameBoardCategory,
      GameBoardLikeRelation,
      GameShoppingCartItem,
      User,
    ]),
  ],
  providers: [
    GameStoresService,
    GameGenreService,
    GameTagService,
    GameReviewService,
    GameReviewCommentService,
    GameBoardService,
    GameBoardCategoryService,
  ],
  controllers: [
    GameStoresController,
    GameGenreController,
    GameTagController,
    GameReviewController,
    GameReviewCommentController,
    GameBoardController,
    GameBoardCategoryController,
  ],
})
export class GameStoreModule {}
