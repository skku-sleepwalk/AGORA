import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetBuyHistory } from 'src/entites/asset/asset.buy.history.entity';
import { AssetDownloadHistory } from 'src/entites/asset/asset.download.history.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';
const ASSET_DOWNLOAD_TOKEN = 50;

@Injectable()
export class AssetPurchaseService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AssetBuyHistory)
    private readonly assetBuyHistoryRepository: Repository<AssetBuyHistory>,
    @InjectRepository(AssetDownloadHistory)
    private readonly assetDownloadHistoryRepository: Repository<AssetDownloadHistory>,
  ) {}
  async buyAsset(userEmail: string, assetId: string) {
    const user = await this.userRepository

      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.cost', 'cost')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }
    if (
      (asset.cost.isFree
        ? 0
        : !asset.cost.isSale
        ? asset.cost.defaultPrice
        : asset.cost.saledPrice) > user.token
    ) {
      throw new ForbiddenException('토큰이 부족합니다.');
    }

    const existingHistory = await this.assetBuyHistoryRepository
      .createQueryBuilder('buyHistory')
      .where('buyHistory.assetId = :assetId', { assetId })
      .andWhere('buyHistory.userId = :userId', { userId: user.id })
      .getOne();
    if (existingHistory) {
      throw new ForbiddenException('이미 구매한 에셋입니다.');
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!asset.cost.isFree) {
        user.token -= asset.cost.isSale
          ? asset.cost.saledPrice
          : asset.cost.defaultPrice;
        await queryRunner.manager.save(User, user);
      }
      await queryRunner.manager.save(AssetBuyHistory, {
        asset,
        user,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async downloadAsset(userEmail: string, assetId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.author', 'author')
      .leftJoinAndSelect('asset.cost', 'cost')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const buyHistoriy = await this.assetBuyHistoryRepository
      .createQueryBuilder('buyHistory')
      .where('buyHistory.assetId = :assetId', { assetId })
      .andWhere('buyHistory.userId = :userId', { userId: user.id })
      .getOne();
    if (!buyHistoriy && !asset.cost.isFree) {
      throw new ForbiddenException('구매 기록을 찾을 수 없습니다.');
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const downloadHistoryCount = await this.assetDownloadHistoryRepository
      .createQueryBuilder('downloadHistory')
      .where('downloadHistory.assetId = :assetId', { assetId })
      .andWhere('downloadHistory.userId = :userId', { userId: user.id })
      .getCount();

    try {
      if (downloadHistoryCount === 0) {
        await queryRunner.manager.save(User, {
          ...asset.author,
          token: asset.author.token + ASSET_DOWNLOAD_TOKEN,
        });
      }
      await queryRunner.manager.save(AssetDownloadHistory, {
        asset,
        user,
      });
      await queryRunner.commitTransaction();
      return asset;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async refundAsset(userEmail: string, assetId: string) {
    const user = await this.userRepository

      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.cost', 'cost')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }
    const buyHistory = await this.assetBuyHistoryRepository
      .createQueryBuilder('buyHistory')
      .where('buyHistory.assetId = :assetId', { assetId })
      .andWhere('buyHistory.userId = :userId', { userId: user.id })
      .getOne();
    if (!buyHistory) {
      throw new NotFoundException('구매 기록을 찾을 수 없습니다.');
    }

    const downloadHistory = await this.assetDownloadHistoryRepository
      .createQueryBuilder('downloadHistory')
      .where('downloadHistory.assetId = :assetId', { assetId })
      .andWhere('downloadHistory.userId = :userId', { userId: user.id })
      .getOne();
    if (downloadHistory) {
      throw new ForbiddenException(
        '이미 다운로드한 에셋은 환불할 수 없습니다.',
      );
    }
    await this.assetBuyHistoryRepository.softDelete(buyHistory.id);
    return true;
  }
}
