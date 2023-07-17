import { EntityRepository, Repository } from 'typeorm';
import {
  GameStoreBoard,
  GameStoreBoardCategory,
  GameStoreBoardLikeRelation,
} from './entities/game-store-board.entity';
import { GameStore, GameStoreGenre } from './entities/game-store.entity';

@EntityRepository(GameStore)
export class GameStoreRepository extends Repository<GameStore> {}

@EntityRepository(GameStoreGenre)
export class GameStoreGenreRepository extends Repository<GameStoreGenre> {}

@EntityRepository(GameStoreBoard)
export class GameStoreBoardRepository extends Repository<GameStoreBoard> {}

@EntityRepository(GameStoreBoardCategory)
export class GameStoreBoardCategoryRepository extends Repository<GameStoreBoardCategory> {}

@EntityRepository(GameStoreBoardLikeRelation)
export class GameStoreBoardLikeRelationRepository extends Repository<GameStoreBoardLikeRelation> {}
