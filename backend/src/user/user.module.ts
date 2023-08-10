import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { UserSubscribeController } from './controllers/user.subscribe.controller';
import { UserSubscribeService } from './services/user.subscribe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PlayTime, UserSubscribe])],
  providers: [UserService, UserSubscribeService],
  controllers: [UsersController, UserSubscribeController],
})
export class UsersModule {}
