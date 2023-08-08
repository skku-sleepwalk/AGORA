import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './user/user.module';
import dotenv from 'dotenv';

import { User } from './entites/user.entity';
import { CommunityCategory } from './entites/community/community.category.entity';

import { GameBoardCategory } from './entites/game/game.board.category.entity';
import { GameBoard } from './entites/game/game.board.entity';
import { GameBoardLike } from './entites/game/game.board.like.entity';
import { GameCost } from './entites/game/game.cost.entity';
import { GameGenre } from './entites/game/game.genre.entity';
import { PlayTime } from './entites/game/game.playtime.entity';
import { GameReviewComment } from './entites/game/game.review.comment.entity';
import { GameReviewCommentLike } from './entites/game/game.review.comment.like.entity';
import { GameShoppingCartItem } from './entites/game/game.shoppingCart.entity';
import { GameStore } from './entites/game/game.store.entity';
import { GameTag } from './entites/game/game.tag.entity';
import { GameTagRelation } from './entites/game/game.tag.relation.entity';
import { GameReview } from './entites/game/game.review.entity';
import { GameReviewLike } from './entites/game/game.review.like.entity';
import { CommunityBoardLike } from './entites/community/community.board.like.entity';

import { CommunityModule } from './community/community.module';
import { GameStoreModule } from './game/game.module';
import { Game } from './entites/game/game.entity';
import { GameInformation } from './entites/game/game.information.entity';
import { CommunityBoard } from './entites/community/community.board.entity';
import { GameLike } from './entites/game/game.like.entity';
import { GameReviewDislike } from './entites/game/game.review.dislike.entity';
import { GameReviewCommentDislike } from './entites/game/game.review.comment.dislike.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './upload/upload.module';
import { AssetModule } from './asset/asset.module';
import { UserSubscribe } from './entites/user.subscribe.entity';

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
        UserSubscribe,
        CommunityBoard,
        CommunityCategory,
        CommunityBoardLike,
        Game,
        GameInformation,
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
      UserSubscribe,
      CommunityBoard,
      CommunityCategory,
      CommunityBoardLike,
      Game,
      GameInformation,
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
    UploadModule,
    UsersModule,
    CommunityModule,
    GameStoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
