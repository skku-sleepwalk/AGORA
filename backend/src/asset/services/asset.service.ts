import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetCost } from 'src/entites/asset/asset.cost.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AssetDto } from '../dto/asset.dto';

@Injectable()
export class AssetService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AssetCost)
    private readonly assetCostRepository: Repository<AssetCost>,
    @InjectRepository(AssetLike)
    private readonly assetLikeRepository: Repository<AssetLike>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async assetModifying(userEmail: string, asset: AssetDto): Promise<AssetDto> {
    const [relations, likeCount] = await this.assetLikeRepository.findAndCount({
      where: { asset: { id: asset.id } },
    });
    asset.like =
      relations.filter((relation) => relation.user.email === userEmail).length >
      0
        ? true
        : false;
    asset.likeCount = likeCount;
    return asset;
  }

  async createAsset(
    userEmail: string,
    title: string,
    description: string,
    downloadUrl: string,
    cost: AssetCost,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      const newCost = await this.dataSource.manager.save(AssetCost, cost);
      const newAsset = this.assetRepository.create({
        title,
        description,
        downloadUrl,
        cost: newCost,
        author: user,
      });
      this.dataSource.manager.save(Asset, newAsset);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAsset(userEmail: string, assetId: string) {
    const asset: AssetDto = await this.assetRepository.findOne({
      where: { id: assetId },
    });
    return this.assetModifying(userEmail, asset);
  }
}
