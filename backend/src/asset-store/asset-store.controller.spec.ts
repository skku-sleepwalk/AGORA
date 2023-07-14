import { Test, TestingModule } from '@nestjs/testing';
import { AssetStoreController } from './asset-store.controller';
import { AssetStoreService } from './asset-store.service';

describe('AssetStoreController', () => {
  let controller: AssetStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetStoreController],
      providers: [AssetStoreService],
    }).compile();

    controller = module.get<AssetStoreController>(AssetStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
