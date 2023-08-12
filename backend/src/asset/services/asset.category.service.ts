import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetCategory } from 'src/entites/asset/asset.category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetCategoryService {
  constructor(
    @InjectRepository(AssetCategory)
    private readonly assetCategoryRepository: Repository<AssetCategory>,
  ) {}

  async createAssetCategory(name: string): Promise<AssetCategory> {
    const existingCategory = await this.assetCategoryRepository
      .createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne();
    if (existingCategory) {
      throw new ConflictException('이미 존재하는 카테고리입니다.');
    }
    const assetCategory = new AssetCategory();
    assetCategory.name = name;
    console.log(assetCategory);
    return await this.assetCategoryRepository.save(assetCategory);
  }
}
