import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetTagService {
  constructor(
    @InjectRepository(AssetTag)
    private readonly assetTagRepository: Repository<AssetTag>,
  ) {}

  async createAssetTag(name: string) {
    const existingTag = await this.assetTagRepository
      .createQueryBuilder('tag')
      .where('tag.name = :name', { name })
      .getOne();
    if (existingTag) {
      throw new ConflictException('이미 존재하는 태그입니다.');
    }
    const assetTag = this.assetTagRepository.create({ name });
    await this.assetTagRepository.save(assetTag);
    return true;
  }

  async getAssetTagList() {
    const assetTags = await this.assetTagRepository.find();
    return assetTags;
  }

  async searchAssetTag(keyword: string) {
    const assetTags = await this.assetTagRepository
      .createQueryBuilder('tag')
      .where('tag.name LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return assetTags;
  }
}
