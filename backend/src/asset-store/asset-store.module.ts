import { Module } from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import { AssetStoreController } from './asset-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AssetStoreBoards,
  AssetStoreReviews,
} from './entities/asset-store.entity';
import {
  AssetStoreBoardsRepository,
  AssetStoreReviewsRepository,
} from './asset-store.repository';
import { UsersModule } from 'src/users/users.module';
import { AssetStoreCategoryModule } from './asset-store-category/asset-store-category.module';

@Module({
  imports: [
    AssetStoreModule,
    UsersModule,
    TypeOrmModule.forFeature([AssetStoreBoards, AssetStoreReviews]),
    AssetStoreCategoryModule,
  ],
  controllers: [AssetStoreController],
  providers: [
    AssetStoreService,
    AssetStoreBoardsRepository,
    AssetStoreReviewsRepository,
  ],
})
export class AssetStoreModule {}
