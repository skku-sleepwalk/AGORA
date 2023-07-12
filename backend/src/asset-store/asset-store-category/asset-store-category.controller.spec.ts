import { Test, TestingModule } from '@nestjs/testing';
import { AssetStoreCategoryController } from './asset-store-category.controller';
import { AssetStoreCategoryService } from './asset-store-category.service';

describe('AssetStoreCategoryController', () => {
  let controller: AssetStoreCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetStoreCategoryController],
      providers: [AssetStoreCategoryService],
    }).compile();

    controller = module.get<AssetStoreCategoryController>(AssetStoreCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
