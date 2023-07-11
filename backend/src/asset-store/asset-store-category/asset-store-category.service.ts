import { Injectable } from '@nestjs/common';
import { CreateAssetStoreCategoryDto } from './dto/create-asset-store-category.dto';
import { UpdateAssetStoreCategoryDto } from './dto/update-asset-store-category.dto';
import { AssetStoreCategoryRepository } from './asset-store-category.repository';
import { Connection } from 'typeorm';

@Injectable()
export class AssetStoreCategoryService {
  private readonly assetStoreCategoryRepository: AssetStoreCategoryRepository;
  constructor(private readonly connection: Connection) {
    this.assetStoreCategoryRepository = connection.getCustomRepository(
      AssetStoreCategoryRepository,
    );
  }

  create(createAssetStoreCategoryDto: CreateAssetStoreCategoryDto) {
    const { name } = createAssetStoreCategoryDto;
    const newAssetStoreCategory = this.assetStoreCategoryRepository.create({
      name,
    });
    return this.assetStoreCategoryRepository.save(newAssetStoreCategory);
  }

  findAll() {
    return `This action returns all assetStoreCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assetStoreCategory`;
  }

  update(id: number, updateAssetStoreCategoryDto: UpdateAssetStoreCategoryDto) {
    return `This action updates a #${id} assetStoreCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetStoreCategory`;
  }
}
