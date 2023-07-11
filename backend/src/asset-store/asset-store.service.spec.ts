import { Test, TestingModule } from '@nestjs/testing';
import { AssetStoreService } from './asset-store.service';

describe('AssetStoreService', () => {
  let service: AssetStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetStoreService],
    }).compile();

    service = module.get<AssetStoreService>(AssetStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
