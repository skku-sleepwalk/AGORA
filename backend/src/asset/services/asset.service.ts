import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkUserExist(userEmail: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  async checkAssetExist(assetId: string) {
    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }
    return asset;
  }

  async validateInput(userEmail: string, assetId: string) {
    return {
      user: await this.checkUserExist(userEmail),
      asset: await this.checkAssetExist(assetId),
    };
  }

  async assetModifying(userEmail: string, asset: Asset): Promise<AssetDto> {
    const [relations, likeCount] = await this.assetLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.assetId =:assetId', {
        assetId: asset.id,
      })
      .andWhere('user.email =:email', { email: userEmail })
      .getManyAndCount();
    const like =
      relations.filter((relation) => relation.user.email === userEmail).length >
      0
        ? true
        : false;
    const { fileUrl, ...data } = asset;

    return { ...data, like, likeCount };
  }

  async dataModifying(userEmail: string, data: Asset[]): Promise<AssetDto[]> {
    return await Promise.all(
      data.map(async (asset) => {
        return await this.assetModifying(userEmail, asset);
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
    thumbnail: string,
    description: string,
    fileUrl: string,
    cost: AssetCost,
    categoryName: string,
    isSensitive: boolean,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.checkUserExist(userEmail);
      const newCost = await this.dataSource.manager.save(AssetCost, cost);
      const category = await this.assetCategoryRepository
        .createQueryBuilder('category')
        .where('category.name = :categoryName', { categoryName })
        .getOne();
      if (!category) {
        throw new NotFoundException('카테고리를 찾을 수 없습니다.');
      }
      const newAsset = this.assetRepository.create({
        title,
        description,
        fileUrl,
        cost: newCost,
        author: user,
        category,
        thumbnail,
        isSensitive,
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
    const asset: Asset = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.author', 'author')
      .leftJoinAndSelect('asset.cost', 'cost')
      .leftJoinAndSelect('asset.category', 'category')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    await this.validateInput(userEmail, assetId);
    return await this.assetModifying(userEmail, asset);
  }

  async getAssets(userEmail: string, _cursor: Cursor, categoryNames: string[]) {
    const queryBuilder = this.createQueryBuilder().where(
      'category.name IN (:...categoryNames)',
      { categoryNames },
    );

    await this.checkUserExist(userEmail);
    return await this.paginating(userEmail, _cursor, queryBuilder);
  }

  async searchAsset(
    userEmail: string,
    keyword: string,
    _cursor: Cursor,
    categoryNames: string[],
  ) {
    const queryBuilder = this.createQueryBuilder().where(
      '(category.name IN (:...categoryNames)) AND (asset.title LIKE :keyword OR asset.description LIKE :keyword)',
      { categoryNames, keyword: `%${keyword}%` },
    );

    return await this.paginating(userEmail, _cursor, queryBuilder);
  }

  async updateAsset(
    userEmail: string,
    assetId: string,
    title: string,
    thumbnail: string,
    description: string,
    fileUrl: string,
    cost: AssetCost,
    categoryName: string,
    isSensitive: boolean,
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

      const asset = await this.assetRepository
        .createQueryBuilder('asset')
        .leftJoinAndSelect('asset.cost', 'cost')
        .leftJoinAndSelect('asset.author', 'author')
        .leftJoinAndSelect('asset.category', 'category')
        .where('asset.id = :assetId', { assetId })
        .getOne();
      if (!asset) {
        throw new NotFoundException('에셋을 찾을 수 없습니다.');
      }

      if (asset.author.email !== userEmail) {
        throw new ForbiddenException('에셋을 수정할 권한이 없습니다.');
      }

      const existingCost = await this.assetCostRepository
        .createQueryBuilder('cost')
        .where('cost.id = :id', { id: asset.cost.id })
        .getOne();
      const newCost = { id: existingCost.id, ...cost };
      await queryRunner.manager.save(AssetCost, newCost);
      const newCategory = await this.assetCategoryRepository
        .createQueryBuilder('category')
        .where('category.name = :categoryName', { categoryName })
        .getOne();

      asset.title = title;
      asset.thumbnail = thumbnail;
      asset.description = description;
      asset.fileUrl = fileUrl;
      asset.category = newCategory;
      asset.isSensitive = isSensitive;

      await queryRunner.manager.save(Asset, asset);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteAsset(userEmail: string, assetId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: userEmail,
      })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.author', 'author')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }
    if (asset.author.email !== userEmail) {
      throw new ForbiddenException('에셋을 삭제할 권한이 없습니다.');
    }
    await this.assetRepository.delete(assetId);
  }
}
