import { Injectable } from '@nestjs/common';
import { CreateAssetStoreDto } from './dto/create-asset-store.dto';
import { UpdateAssetStoreDto } from './dto/update-asset-store.dto';

@Injectable()
export class AssetStoreService {
  create(createAssetStoreDto: CreateAssetStoreDto) {
    return 'This action adds a new assetStore';
  }

  findAll() {
    return `This action returns all assetStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assetStore`;
  }

  update(id: number, updateAssetStoreDto: UpdateAssetStoreDto) {
    return `This action updates a #${id} assetStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetStore`;
  }
}
