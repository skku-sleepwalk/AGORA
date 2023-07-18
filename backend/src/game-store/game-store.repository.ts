import { EntityRepository, Repository } from 'typeorm';
import {
  GameStoreBoard,
  GameStoreBoardCategory,
  GameStoreBoardLikeRelation,
} from './entities/game-store-board.entity';
import {
  Cost,
  GameStore,
  GameStoreTag,
  SNSUrls,
  ShortDescription,
} from './entities/game-store.entity';
import { GameStoreReview } from './entities/game-store-review.entity';

@EntityRepository(GameStore)
export class GameStoreRepository extends Repository<GameStore> {}

@EntityRepository(ShortDescription)
export class ShortDescriptionRepository extends Repository<ShortDescription> {}

@EntityRepository(SNSUrls)
export class SNSUrlsRepository extends Repository<SNSUrls> {}

@EntityRepository(Cost)
export class CostRepository extends Repository<Cost> {}

@EntityRepository(GameStoreTag)
export class GameStoreTagRepository extends Repository<GameStoreTag> {}

@EntityRepository(GameStoreReview)
export class GameStoreReviewRepository extends Repository<GameStoreReview> {}

@EntityRepository(GameStoreBoard)
export class GameStoreBoardRepository extends Repository<GameStoreBoard> {}

@EntityRepository(GameStoreBoardCategory)
export class GameStoreBoardCategoryRepository extends Repository<GameStoreBoardCategory> {}

@EntityRepository(GameStoreBoardLikeRelation)
export class GameStoreBoardLikeRelationRepository extends Repository<GameStoreBoardLikeRelation> {}
