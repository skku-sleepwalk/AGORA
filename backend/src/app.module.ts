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

import { GameBoardCategory } from './entites/game.board.category.entity';
import { GameBoard } from './entites/game.board.entity';
import { GameBoardLike } from './entites/game.board.like.entity';
import { GameCost } from './entites/game.cost.entity';
import { GameGenre } from './entites/game.genre.entity';
import { PlayTime } from './entites/game.playtime.entity';
import { GameReviewComment } from './entites/game.review.comment.entity';
import { GameReviewCommentLike } from './entites/game.review.comment.like.entity';
import { GameShoppingCartItem } from './entites/game.shoppingCart.entity';
import { GameStore } from './entites/game.store.entity';
import { GameTag } from './entites/game.tag.entity';
import { GameTagRelation } from './entites/game.tag.relation.entity';
import { GameReview } from './entites/game.review.entity';
import { GameReviewLike } from './entites/game.review.like.entity';
import { CommunityBoardLike } from './entites/community.board.like.entity';

import { CommunityBoardService } from './community/services/community.board.service';
import { CommunityModule } from './community/community.module';
import { GameStoreModule } from './game/game.module';
import { Game } from './entites/game.entity';
import { GameDescription } from './entites/game.description.entity';
import { CommunityBoard } from './entites/community.board.entity';
import { GameLike } from './entites/game.like.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { GameReviewDislike } from './entites/game.review.dislike.entity';
import { GameReviewCommentDislike } from './entites/game.review.comment.dislike.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
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
        CommunityBoardLike,
        Game,
        GameDescription,
        GameBoardCategory,
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
        GameLike,
        GameTag,
        GameTagRelation,
      ],
      synchronize: true,
      logging: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([
      User,
      CommunityBoard,
      CommunityCategory,
      CommunityBoardLike,
      Game,
      GameDescription,
      GameBoardCategory,
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
      GameLike,
      GameTag,
      GameTagRelation,
    ]),
    UsersModule,
    CommunityModule,
    GameStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
