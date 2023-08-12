import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';
import { AssetTagRelation } from 'src/entites/asset/asset.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetTagRelationService {
  constructor(
    @InjectRepository(AssetTagRelation)
    private readonly assetTagRelationRepository: Repository<AssetTagRelation>,
    @InjectRepository(AssetTag)
    private readonly assetTagAssetTagRepository: Repository<AssetTag>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createAssetTagRelation(
    userEmail: string,
    assetId: string,
    tagName: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const tag = await this.assetTagAssetTagRepository
      .createQueryBuilder('tag')
      .where('tag.name = :name', { name: tagName })
      .getOne();
    if (!tag) {
      throw new NotFoundException('태그를 찾을 수 없습니다.');
    }

    const existingAssetTagRelation = await this.assetTagRelationRepository
      .createQueryBuilder('relation')
      .where('relation.userId = :userId', { userId: user.id })
      .andWhere('relation.assetId = :assetId', { assetId: assetId })
      .andWhere('relation.tagId = :tagId', { tagId: tag.id })
      .getOne();
    if (existingAssetTagRelation) {
      throw new ConflictException('이미 태그를 추가한 에셋입니다.');
    }

    const assetTagRelation = this.assetTagRelationRepository.create({
      user: user,
      asset: asset,
      tag: tag,
    });

    await this.assetTagRelationRepository.save(assetTagRelation);
    return true;
  }

  async getAssetTagRelations(userEmail: string, assetId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const assetTagRelations = await this.assetTagRelationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.tag', 'tag')
      .where('relation.userId = :userId', { userId: user.id })
      .andWhere('relation.assetId = :assetId', { assetId: assetId })
      .getMany();
    return assetTagRelations;
  }

  async deleteAssetTagRelation(
    userEmail: string,
    assetId: string,
    tagName: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const tag = await this.assetTagAssetTagRepository
      .createQueryBuilder('tag')
      .where('tag.name = :name', { name: tagName })
      .getOne();
    if (!tag) {
      throw new NotFoundException('태그를 찾을 수 없습니다.');
    }

    const existingAssetTagRelation = await this.assetTagRelationRepository
      .createQueryBuilder('relation')
      .where('relation.userId = :userId', { userId: user.id })
      .andWhere('relation.assetId = :assetId', { assetId: assetId })
      .andWhere('relation.tagId = :tagId', { tagId: tag.id })
      .getOne();
    if (!existingAssetTagRelation) {
      throw new NotFoundException('태그를 추가하지 않은 에셋입니다.');
    }

    await this.assetTagRelationRepository.delete(existingAssetTagRelation.id);
    return true;
  }
}
