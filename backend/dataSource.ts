import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from 'src/entites/user.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityBoardLike } from 'src/entites/community.board.like.entity';
import { GameBoardCategory } from 'src/entites/game.board.category.entity';
import { GameBoard } from 'src/entites/game.board.entity';
import { GameBoardLike } from 'src/entites/game.board.like.entity';
import { GameCost } from 'src/entites/game.cost.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { PlayTime } from 'src/entites/game.playtime.entity';
import { GameReview } from 'src/entites/game.review.entity';
import { GameReviewLike } from 'src/entites/game.review.like.entity';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';
import { GameReviewCommentLike } from 'src/entites/game.review.comment.like.entity';
import { GameShoppingCartItem } from 'src/entites/game.shoppingCart.entity';
import { GameStore } from 'src/entites/game.store.entity';
import { GameTag } from 'src/entites/game.tag.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
import { GameReviewCommentDislike } from 'src/entites/game.review.comment.dislike.entity';
import { Game } from 'src/entites/game.entity';
import { GameLike } from 'src/entites/game.like.entity';
import { GameReviewDislike } from 'src/entites/game.review.dislike.entity';
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'AGORA',
  entities: [
    User,
    CommunityCategory,
    CommunityBoard,
    CommunityBoardLike,
    GameBoardCategory,
    Game,
    GameLike,
    GameBoard,
    GameBoardLike,
    GameCost,
    GameGenre,
    PlayTime,
    GameReview,
    GameReviewLike,
    GameReviewDislike,
    GameReviewComment,
    GameReviewCommentLike,
    GameReviewCommentDislike,
    GameShoppingCartItem,
    GameStore,
    GameTag,
    GameTagRelation,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default dataSource;
