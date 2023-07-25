import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './user/user.module';
import dotenv from 'dotenv';

import { User } from './entites/user.entity';
import { CommunityCategory } from './entites/community.category.entity';
import { CommunityBoard } from './entites/community.board.entity';
import { GameBoardCategory } from './entites/game.board.category.entity';
import { GameBoard } from './entites/game.board.entity';
import { GameBoardLikeRelation } from './entites/game.board.like.relation.entity';
import { GameCost } from './entites/game.cost.entity';
import { GameGenre } from './entites/game.genre.entity';
import { PlayTimeRelation } from './entites/game.playtime.relation.entity';
import { GameReviewComment } from './entites/game.review.comment.entity';
import { GameReviewCommentLikeRelation } from './entites/game.review.comment.like.relation';
import { GameShoppingCartItem } from './entites/game.shoppingCart.entity';
import { GameStore } from './entites/game.store.entity';
import { GameTag } from './entites/game.tag.entity';
import { GameTagRelation } from './entites/game.tag.relation.entity';
import { GameReview } from './entites/game.review.entity';
import { GameReviewLikeRelation } from './entites/game.review.like.relation';
import { CommunityBoardLikeRelation } from './entites/community.board.like.relation';

import { CommunityBoardService } from './community/services/community.board.service';
import { CommunityModule } from './community/community.module';
import { GameStoreModule } from './game/game.module';
import { Game } from './entites/game.entity';
import { GameDescription } from './entites/game.description.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CommunityModule,
    GameStoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        CommunityBoard,
        CommunityCategory,
        CommunityBoardLikeRelation,
        Game,
        GameDescription,
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
      synchronize: true,
      logging: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CommunityBoardService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
