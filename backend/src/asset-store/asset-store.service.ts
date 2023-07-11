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
import { AssetStoreBoards } from './entities/asset-store.entity';
import { Cursor } from 'typeorm-cursor-pagination';

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

  getBoardWithRelations(): SelectQueryBuilder<AssetStoreBoards> {
    return this.assetStoreBoardsRepository
      .createQueryBuilder('AssetStoreBoards')
      .leftJoinAndSelect('AssetStoreBoards.author', 'author')
      .leftJoinAndSelect(
        'AssetStoreBoards.assetStoreReviews',
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
    const board = await this.getBoardWithRelations()
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

  findAllAssetStoreBoards(cursor: Cursor, order) {
    return `This action returns all assetStore`;
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
