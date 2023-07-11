import { Injectable } from '@nestjs/common';
import {
  CreateAssetStoreBoardsDto,
  CreateAssetStoreReviewsDto,
} from './dto/create-asset-store.dto';
import { UpdateAssetStoreDto } from './dto/update-asset-store.dto';
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
} from './entities/asset-store.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { cloneDeep } from 'lodash';

@Injectable()
export class AssetStoreService {
  private readonly assetStoreBoardsRepository: AssetStoreBoardsRepository;
  private readonly assetStoreReviewsRepository: AssetStoreReviewsRepository;
  private readonly userRepository: UserRepository;
  constructor(private readonly connection: Connection) {
    this.assetStoreBoardsRepository = connection.getCustomRepository(
      AssetStoreBoardsRepository,
    );
    this.assetStoreReviewsRepository = connection.getCustomRepository(
      AssetStoreReviewsRepository,
    );
    this.userRepository = connection.getCustomRepository(UserRepository);
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
      );
  }
  async createAssetStoreBoards(
    createAssetStoreBoardsDto: CreateAssetStoreBoardsDto,
  ) {
    const { title, description, downloadUrl, price, authorEmail } =
      createAssetStoreBoardsDto;
    const author = await this.userRepository.findOne({ email: authorEmail });
    const newAssetStoreBoard = this.assetStoreBoardsRepository.create({
      id: uuid(),
      title,
      description,
      author,
      downloadUrl,
      price,
      assetStoreReviews: [],
    });
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

  async findAllAssetStoreBoards(_cursor: Cursor, order: AssetStoreBoardsOrder) {
    const queryBuilder = this.getAssetStoreBoardsWithRelations();
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
  ) {
    const queryBuilder = this.getAssetStoreBoardsWithRelations().where(
      'assetStoreBoards.title LIKE :search OR assetStoreBoards.description LIKE :search',
      {
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

  findOne(id: number) {
    return `This action returns a #${id} assetStore`;
  }

  update(id: number, updateAssetStoreDto: UpdateAssetStoreDto) {
    return `This action updates a #${id} assetStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} assetStore`;
  }
}
