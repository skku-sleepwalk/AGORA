import { Module } from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { GameStoreController } from './game-store.controller';

@Module({
  controllers: [GameStoreController],
  providers: [GameStoreService],
  imports: [],
})
export class GameStoreModule {}
