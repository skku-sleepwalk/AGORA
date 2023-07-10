import { Module } from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import { AssetStoreController } from './asset-store.controller';

@Module({
  controllers: [AssetStoreController],
  providers: [AssetStoreService],
})
export class AssetStoreModule {}
