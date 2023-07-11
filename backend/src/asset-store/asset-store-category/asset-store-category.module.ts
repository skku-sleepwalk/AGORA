import { Module } from '@nestjs/common';
import { AssetStoreCategoryService } from './asset-store-category.service';
import { AssetStoreCategoryController } from './asset-store-category.controller';

@Module({
  controllers: [AssetStoreCategoryController],
  providers: [AssetStoreCategoryService],
})
export class AssetStoreCategoryModule {}
