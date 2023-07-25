import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from 'src/entites/user.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityBoardLikeRelation } from 'src/entites/community.board.like.relation';
import { GameBoardCategory } from 'src/entites/game.board.category.entity';
import { GameBoard } from 'src/entites/game.board.entity';
import { GameBoardLikeRelation } from 'src/entites/game.board.like.relation.entity';
import { GameCost } from 'src/entites/game.cost.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { PlayTimeRelation } from 'src/entites/game.playtime.relation.entity';
import { GameReview } from 'src/entites/game.review.entity';
import { GameReviewLikeRelation } from 'src/entites/game.review.like.relation';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';
import { GameReviewCommentLikeRelation } from 'src/entites/game.review.comment.like.relation';
import { GameShoppingCartItem } from 'src/entites/game.shoppingCart.entity';
import { GameStore } from 'src/entites/game.store.entity';
import { GameTag } from 'src/entites/game.tag.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
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
    CommunityBoardLikeRelation,
    GameBoardCategory,
    GameBoard,
    GameBoardLikeRelation,
    GameCost,
    GameGenre,
    PlayTimeRelation,
    GameReview,
    GameReviewLikeRelation,
    GameReviewComment,
    GameReviewCommentLikeRelation,
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
