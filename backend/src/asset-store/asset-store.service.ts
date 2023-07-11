import { Injectable } from '@nestjs/common';
import {
  CreateAssetStoreBoardsDto,
  CreateAssetStoreReviewsDto,
} from './dto/create-asset-store.dto';
import {
  UpdateAssetStoreBoardsDto,
  UpdateAssetStoreReviewsDto,
} from './dto/update-asset-store.dto';
import { UserRepository } from 'src/users/user.repository';
import {
  AssetStoreBoardsRepository,
  AssetStoreReviewsRepository,
} from './asset-store.repository';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  AssetStoreBoards,
  AssetStoreBoardsOrder,
  AssetStoreReviews,
} from './entities/asset-store.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { cloneDeep } from 'lodash';
import { AssetStoreCategoryRepository } from './asset-store-category/asset-store-category.repository';

@Injectable()
export class AssetStoreService {
  private readonly assetStoreBoardsRepository: AssetStoreBoardsRepository;
  private readonly assetStoreReviewsRepository: AssetStoreReviewsRepository;
  private readonly userRepository: UserRepository;
  private readonly assetStoreCategoryRepository: AssetStoreCategoryRepository;
  constructor(private readonly connection: Connection) {
    this.assetStoreBoardsRepository = connection.getCustomRepository(
      AssetStoreBoardsRepository,
    );
    this.assetStoreReviewsRepository = connection.getCustomRepository(
      AssetStoreReviewsRepository,
    );
    this.userRepository = connection.getCustomRepository(UserRepository);
    this.assetStoreCategoryRepository = connection.getCustomRepository(
      AssetStoreCategoryRepository,
    );
  }

  private paginateOption: PaginationOptions<AssetStoreBoards> = {
    entity: AssetStoreBoards,
    paginationKeys: ['createdAt'],
    query: {
      afterCursor: null,
      beforeCursor: null,
      limit: 5,
      order: 'DESC',
    },
  };

  getAssetStoreBoardsWithRelations(): SelectQueryBuilder<AssetStoreBoards> {
    return this.assetStoreBoardsRepository
      .createQueryBuilder('assetStoreBoards')
      .leftJoinAndSelect('assetStoreBoards.author', 'author')
      .leftJoinAndSelect(
        'assetStoreBoards.assetStoreReviews',
        'assetStoreReviews',
      )
      .leftJoinAndSelect('assetStoreBoards.likedUsers', 'likedUsers')
      .leftJoinAndSelect('assetStoreBoards.categoryTypes', 'categoryTypes');
  }

  async createAssetStoreBoards(
    createAssetStoreBoardsDto: CreateAssetStoreBoardsDto,
  ) {
    const {
      title,
      description,
      downloadUrl,
      price,
      authorEmail,
      categoryNames,
    } = createAssetStoreBoardsDto;
    const author = await this.userRepository.findOne({ email: authorEmail });
    const newAssetStoreBoard = this.assetStoreBoardsRepository.create({
      id: uuid(),
      title,
      description,
      author,
      downloadUrl,
      price,
      assetStoreReviews: [],
      categoryTypes: [],
    });
    for (const categoryName of categoryNames) {
      const categoryType = await this.assetStoreCategoryRepository.findOne({
        name: categoryName,
      });
      newAssetStoreBoard.categoryTypes.push(categoryType);
    }
    return this.assetStoreBoardsRepository.save(newAssetStoreBoard);
  }

  async createAssetStoreReviews(
    createAssetStoreReviewsDto: CreateAssetStoreReviewsDto,
  ) {
    const { writerEmail, assetStoreBoardId, rating, description } =
      createAssetStoreReviewsDto;
    const writer = await this.userRepository.findOne({ email: writerEmail });
    const board = await this.getAssetStoreBoardsWithRelations()
      .where('AssetStoreBoards.id = :id', { id: assetStoreBoardId })
      .getOne();
    const newAssetStoreReview = this.assetStoreReviewsRepository.create({
      id: uuid(),
      writer,
      rating,
      description,
    });
    board.assetStoreReviews.push(newAssetStoreReview);
    this.assetStoreBoardsRepository.save(board);
    return this.assetStoreReviewsRepository.save(newAssetStoreReview);
  }

  async findAllAssetStoreBoards(
    _cursor: Cursor,
    order: AssetStoreBoardsOrder,
    categoryNames: string[],
  ) {
    const queryBuilder = this.getAssetStoreBoardsWithRelations().where(
      'categoryTypes.name IN (:...categoryNames)',
      { categoryNames: categoryNames },
    );
    const paginateOption: PaginationOptions<AssetStoreBoards> = cloneDeep(
      this.paginateOption,
    );
    if (order) paginateOption.paginationKeys = [order];
    if (_cursor.afterCursor)
      paginateOption.query.afterCursor = _cursor.afterCursor;
    if (_cursor.beforeCursor)
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  async searchAssetStoreBoards(
    _cursor: Cursor,
    order: AssetStoreBoardsOrder,
    search: string,
    categoryNames: string[],
  ) {
    const queryBuilder = this.getAssetStoreBoardsWithRelations().where(
      '(categoryTypes.name IN (:...categoryNames)) AND (assetStoreBoards.title LIKE :search OR assetStoreBoards.description LIKE :search)',
      {
        categoryNames: categoryNames,
        search: `%${search}%`,
      },
    );
    const paginateOption: PaginationOptions<AssetStoreBoards> = cloneDeep(
      this.paginateOption,
    );
    if (order) paginateOption.paginationKeys = [order];
    if (_cursor.afterCursor)
      paginateOption.query.afterCursor = _cursor.afterCursor;
    if (_cursor.beforeCursor)
      paginateOption.query.beforeCursor = _cursor.beforeCursor;
    const paginator = buildPaginator(paginateOption);
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { data, cursor };
  }

  findOne(id: string) {
    const queryBuilder = this.getAssetStoreBoardsWithRelations().where(
      'assetStoreBoard.id = :id',
      { id },
    );
    return queryBuilder.getOne();
  }

  async updateAssetStoreBoards(
    id: string,
    updateAssetStoreBoardsDto: UpdateAssetStoreBoardsDto,
  ) {
    const {
      title,
      price,
      updateEmail,
      description,
      downloadUrl,
      categoryNames,
    } = updateAssetStoreBoardsDto;
    const toUpdateAssetStoreBoard: AssetStoreBoards =
      await this.getAssetStoreBoardsWithRelations()
        .where('assetStoreBoard.id = :id', { id })
        .getOne();

    if (updateEmail === toUpdateAssetStoreBoard.author.email) {
      toUpdateAssetStoreBoard.title = title;
      toUpdateAssetStoreBoard.description = description;
      toUpdateAssetStoreBoard.price = price;
      toUpdateAssetStoreBoard.downloadUrl = downloadUrl;
      for (const categoryName of categoryNames) {
        const categoryType = await this.assetStoreCategoryRepository.findOne({
          name: categoryName,
        });
        if (categoryType) {
          toUpdateAssetStoreBoard.categoryTypes.push(categoryType);
        }
      }
    }
    return this.assetStoreBoardsRepository.save(toUpdateAssetStoreBoard);
  }

  async updateAssetStoreReviews(
    id: string,
    updateAssetStoreReviewsDto: UpdateAssetStoreReviewsDto,
  ) {
    const { rating, description, updateEmail } = updateAssetStoreReviewsDto;
    const toUpdateAssetStoreReview: AssetStoreReviews =
      await this.assetStoreReviewsRepository.findOne(id);
    if (updateEmail === toUpdateAssetStoreReview.writer.email) {
      toUpdateAssetStoreReview.rating = rating;
      toUpdateAssetStoreReview.description = description;
    }
    return this.assetStoreReviewsRepository.save(toUpdateAssetStoreReview);
  }
  async removeAssetStoreBoards(id: string) {
    await this.assetStoreBoardsRepository.softDelete(id);
  }

  async removeAssetStoreReviews(id: string) {
    await this.assetStoreReviewsRepository.softDelete(id);
  }
}
