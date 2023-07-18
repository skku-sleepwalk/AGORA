import { Module } from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { GameStoreController } from './game-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStore } from './entities/game-store.entity';

@Module({
  controllers: [GameStoreController],
  providers: [GameStoreService],
  imports: [],
})
export class GameStoreModule {}
