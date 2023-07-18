import { EntityRepository, Repository } from 'typeorm';
import {
  GameStoreBoard,
  GameStoreBoardCategory,
  GameStoreBoardLikeRelation,
} from './entities/game-store-board.entity';
import {
  Cost,
  GameStore,
  GameStoreGenre,
  SNSUrls,
  ShortDescription,
} from './entities/game-store.entity';

@EntityRepository(GameStore)
export class GameStoreRepository extends Repository<GameStore> {}

@EntityRepository(ShortDescription)
export class ShortDescriptionRepository extends Repository<ShortDescription> {}

@EntityRepository(SNSUrls)
export class SNSUrlsRepository extends Repository<SNSUrls> {}

@EntityRepository(GameStoreGenre)
export class GameStoreGenreRepository extends Repository<GameStoreGenre> {}

@EntityRepository(Cost)
export class CostRepository extends Repository<Cost> {}

@EntityRepository(GameStoreBoard)
export class GameStoreBoardRepository extends Repository<GameStoreBoard> {}

@EntityRepository(GameStoreBoardCategory)
export class GameStoreBoardCategoryRepository extends Repository<GameStoreBoardCategory> {}

@EntityRepository(GameStoreBoardLikeRelation)
export class GameStoreBoardLikeRelationRepository extends Repository<GameStoreBoardLikeRelation> {}
