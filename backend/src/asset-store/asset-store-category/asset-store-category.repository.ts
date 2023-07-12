import { EntityRepository, Repository } from 'typeorm';
import { AssetStoreCategory } from './entities/asset-store-category.entity';

@EntityRepository(AssetStoreCategory)
export class AssetStoreCategoryRepository extends Repository<AssetStoreCategory> {}
