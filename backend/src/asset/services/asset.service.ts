import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetCost } from 'src/entites/asset/asset.cost.entity';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetLike } from 'src/entites/asset/asset.like.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AssetDto } from '../dto/asset.dto';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { CursoredAssetDto } from 'src/common/dto/cursoredData.dto';
import { AssetSearch } from 'src/entites/asset/asset.search.entity';
import { AssetCategory } from 'src/entites/asset/asset.category.entity';

@Injectable()
export class AssetService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AssetCategory)
    private readonly assetCategoryRepository: Repository<AssetCategory>,
    @InjectRepository(AssetCost)
    private readonly assetCostRepository: Repository<AssetCost>,
    @InjectRepository(AssetLike)
    private readonly assetLikeRepository: Repository<AssetLike>,
    @InjectRepository(AssetSearch)
    private readonly assetSearchRepository: Repository<AssetSearch>,
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

  async dataModifying(userEmail: string, data: Asset[]): Promise<AssetDto[]> {
    return await Promise.all(
      data.map(async (asset) => {
        return this.assetModifying(userEmail, asset);
      }),
    );
  }

  createQueryBuilder(): SelectQueryBuilder<Asset> {
    return this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.author', 'author')
      .leftJoinAndSelect('asset.cost', 'cost')
      .leftJoinAndSelect('asset.category', 'category');
  }

  async paginating(
    userEmail: string,
    _cursor: Cursor,
    queryBuilder: SelectQueryBuilder<Asset>,
  ): Promise<CursoredAssetDto> {
    const paginationOption: PaginationOptions<Asset> = {
      entity: Asset,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 6,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('asset');

    const { data, cursor } = await paginator.paginate(queryBuilder);
    const assets = await this.dataModifying(userEmail, data);
    return { data: assets, cursor };
  }

  async createAsset(
    userEmail: string,
    title: string,
    description: string,
    downloadUrl: string,
    cost: AssetCost,
    categoryName: string,
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
      // const category = await this.assetCategoryRepository.findOne({
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

  async searchAsset(
    userEmail: string,
    keyword: string,
    _cursor: Cursor,
    category: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    const queryBuilder = this.createQueryBuilder()
      .where('category.name = :category', { category })
      .andWhere(
        'asset.title LIKE :keyword OR asset.description LIKE :keyword',
        {
          keyword: `%${keyword}%`,
        },
      );
    if (user) {
      await this.assetSearchRepository.save({ keyword, user }); // 검색어 저장
    }
    return await this.paginating(userEmail, _cursor, queryBuilder);
  }

  async getAssetSearch(userEmail: string) {
    const searchList = await this.assetSearchRepository.find({
      where: { user: { email: userEmail } },
    });
    searchList
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
    return searchList.map((search) => search.keyword);
  }

  async updateAsset(
    assetId: string,
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
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      const asset = await this.assetRepository.findOne({
        where: { id: assetId },
      });
      if (!asset) {
        throw new NotFoundException('자산을 찾을 수 없습니다.');
      }

      const newCost = await this.dataSource.manager.save(AssetCost, cost);
      const newAsset = this.assetRepository.create({
        title,
        description,
        downloadUrl,
        cost: newCost,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
