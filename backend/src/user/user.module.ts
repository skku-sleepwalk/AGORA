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
