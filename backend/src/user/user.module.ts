import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PlayTime])],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
