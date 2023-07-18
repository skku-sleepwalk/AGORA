import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStore } from './game-store.entity';

export type likeAction = 'like' | 'unlike';

@Entity('GameStoreReview')
export class GameStoreReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.gameStoreReviews)
  readonly writer: User;

  @ManyToOne(() => GameStore, (gameStore) => gameStore.gameStoreReview)
  readonly gameStore: GameStore;

  @OneToMany(
    () => GameStoreReviewLikeRelation,
    (relation) => relation.gameStoreReview,
  )
  gameStoreReviewLikeRelations: Array<GameStoreReviewLikeRelation>;

  @Column({ nullable: false })
  content: string;
}

@Entity('GameStoreReviewLikeRelation')
export class GameStoreReviewLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(
    () => GameStoreReview,
    (review) => review.gameStoreReviewLikeRelations,
  )
  readonly gameStoreReview: GameStoreReview;

  @ManyToOne(() => User, (user) => user.gameStoreReviewLikeRelations)
  readonly user: User;

  @Column({ nullable: false })
  likeAction: likeAction;
}
