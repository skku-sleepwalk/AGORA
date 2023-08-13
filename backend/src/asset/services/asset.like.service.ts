import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetLikeService {
  constructor(
    @InjectRepository(AssetLike)
    private readonly assetLikeRepository: Repository<AssetLike>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAssetLike(userEmail: string, assetId: string) {
    console.log(assetId);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    console.log(user, typeof userEmail);
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

    const existingAssetLike = await this.assetLikeRepository
      .createQueryBuilder('like')
      .where('like.userId = :userId', { userId: user.id })
      .andWhere('like.assetId = :assetId', { assetId: asset.id })
      .getOne();
    if (existingAssetLike) {
      throw new ConflictException('이미 좋아요를 누른 에셋입니다.');
    }
    const assetLike = this.assetLikeRepository.create({ user, asset });
    await this.assetLikeRepository.save(assetLike);
    return true;
  }

  async deleteAssetLike(userEmail: string, assetId: string) {
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

    const existingAssetLike = await this.assetLikeRepository
      .createQueryBuilder('like')
      .where('like.userId = :userId', { userId: user.id })
      .andWhere('like.assetId = :assetId', { assetId: asset.id })
      .getOne();
    if (!existingAssetLike) {
      throw new ConflictException('좋아요를 누르지 않은 에셋입니다.');
    }
    await this.assetLikeRepository.delete(existingAssetLike.id);
  }
}
