import { Injectable } from '@nestjs/common';
import { CreateAssetStoreBoardsDto } from './dto/create-asset-store.dto';
import { UpdateAssetStoreDto } from './dto/update-asset-store.dto';
import { UserRepository } from 'src/users/user.repository';
import {
  AssetStoreBoardsRepository,
  AssetStoreReviewsRepository,
} from './asset-store.repository';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

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
  }

  async createAssetStoreBoards(
    createAssetStoreBoardsDto: CreateAssetStoreBoardsDto,
  ) {
    const { title, description, downloadUrl, price, authorId } =
      createAssetStoreBoardsDto;

    const author = await this.userRepository.findOne(authorId);
    const newAssetStoreBoard = this.assetStoreBoardsRepository.create({
      id: uuid(),
      title,
      description,
      author,
      downloadUrl,
      price,
    });
    return this.assetStoreBoardsRepository.save(newAssetStoreBoard);
  }

  findAll() {
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
