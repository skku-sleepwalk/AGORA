import { EntityRepository, Repository } from 'typeorm';
import {
  AssetStoreBoards,
  AssetStoreReviews,
} from './entities/asset-store.entity';

@EntityRepository(AssetStoreBoards)
export class AssetStoreBoardsRepository extends Repository<AssetStoreBoards> {}

@EntityRepository(AssetStoreReviews)
export class AssetStoreReviewsRepository extends Repository<AssetStoreReviews> {}
