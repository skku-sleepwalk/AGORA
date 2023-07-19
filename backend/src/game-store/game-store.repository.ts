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
  PlayTimeRelation,
  SNSUrls,
  ShortDescription,
} from './entities/game-store.entity';
import {
  GameStoreReview,
  GameStoreReviewComment,
  GameStoreReviewLikeRelation,
} from './entities/game-store-review.entity';

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

@EntityRepository(PlayTimeRelation)
export class PlayTimeRelationRepository extends Repository<PlayTimeRelation> {}

@EntityRepository(GameStoreReview)
export class GameStoreReviewRepository extends Repository<GameStoreReview> {}

@EntityRepository(GameStoreReviewComment)
export class GameStoreReviewCommentRepository extends Repository<GameStoreReviewComment> {}

@EntityRepository(GameStoreReviewLikeRelation)
export class GameStoreReviewLikeRelationRepository extends Repository<GameStoreReviewLikeRelation> {}

@EntityRepository(GameStoreBoard)
export class GameStoreBoardRepository extends Repository<GameStoreBoard> {}

@EntityRepository(GameStoreBoardCategory)
export class GameStoreBoardCategoryRepository extends Repository<GameStoreBoardCategory> {}

@EntityRepository(GameStoreBoardLikeRelation)
export class GameStoreBoardLikeRelationRepository extends Repository<GameStoreBoardLikeRelation> {}
