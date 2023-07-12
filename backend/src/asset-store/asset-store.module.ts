import { Module } from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import { AssetStoreController } from './asset-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AssetStoreBoards,
  AssetStoreReviews,
} from './entities/asset-store.entity';
import { AssetStoreBoardsRepository } from './asset-store.repository';
import { AssetStoreCategoryModule } from './asset-store-category/asset-store-category.module';

@Module({
  imports: [
    AssetStoreModule,
    AssetStoreCategoryModule,
    TypeOrmModule.forFeature([AssetStoreBoards]),
    TypeOrmModule.forFeature([AssetStoreReviews]),
  ],
  controllers: [AssetStoreController],
  providers: [AssetStoreService, AssetStoreBoardsRepository],
  exports: [TypeOrmModule],
})
export class AssetStoreModule {}
