import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AssetLikeService {
  constructor(
    private readonly dataSource: DataSource,
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingAssetLike = await this.assetLikeRepository
        .createQueryBuilder('like')
        .where('like.userId = :userId', { userId: user.id })
        .andWhere('like.assetId = :assetId', { assetId: asset.id })
        .getOne();
      if (existingAssetLike) {
        throw new ConflictException('이미 좋아요가 존재합니다.');
      }
      await queryRunner.manager.save(AssetLike, { user, asset });
      await queryRunner.manager.increment(
        Asset,
        { id: assetId },
        'likeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(AssetLike, { user, asset });
      await queryRunner.manager.decrement(
        Asset,
        { id: assetId },
        'likeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
