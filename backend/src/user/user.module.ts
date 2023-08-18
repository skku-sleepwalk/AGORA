import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { UserSubscribeController } from './controllers/user.subscribe.controller';
import { UserSubscribeService } from './services/user.subscribe.service';
import { Game } from 'src/entites/game/game.entity';
import { GameLike } from 'src/entites/game/game.like.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { GameBoardLike } from 'src/entites/game/game.board.like.entity';
import { GameBoardView } from 'src/entites/game/game.board.view.entity';
import { CommunityBoard } from 'src/entites/community/community.board.entity';
import { CommunityBoardLike } from 'src/entites/community/community.board.like.entity';
import { CommunityBoardView } from 'src/entites/community/community.board.view.entity';
import { UserProfileService } from './services/user.profile.service';
import { UserProfileController } from './controllers/user.profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSubscribe,
      CommunityBoard,
      CommunityBoardLike,
      CommunityBoardView,
      PlayTime,
      Game,
      GameLike,
      GameBoard,
      GameBoardLike,
      GameBoardView,
      Asset,
      AssetDownloadHistory,
    ]),
  ],
  providers: [UserService, UserSubscribeService, UserProfileService],
  controllers: [
    UsersController,
    UserSubscribeController,
    UserProfileController,
  ],
})
export class UsersModule {}
