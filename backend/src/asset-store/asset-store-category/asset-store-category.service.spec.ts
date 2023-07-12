import { Test, TestingModule } from '@nestjs/testing';
import { AssetStoreCategoryService } from './asset-store-category.service';

describe('AssetStoreCategoryService', () => {
  let service: AssetStoreCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetStoreCategoryService],
    }).compile();

    service = module.get<AssetStoreCategoryService>(AssetStoreCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
