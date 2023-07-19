import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameStore } from './game-store.entity';

export type LikeAction = 'like' | 'unlike';

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
  likeRelation: Array<GameStoreReviewLikeRelation>;

  @OneToMany(() => GameStoreReviewComment, (comment) => comment.review)
  comments: Array<GameStoreReviewComment>;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @Column({ nullable: false, default: 0 })
  unlikeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}

@Entity('GameStoreReviewLikeRelation')
export class GameStoreReviewLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameStoreReview, (review) => review.likeRelation)
  readonly gameStoreReview: GameStoreReview;

  @ManyToOne(() => User, (user) => user.gameStoreReviewLikeRelations)
  user: User;

  @Column({ nullable: false })
  likeAction: LikeAction;
}

@Entity('GameStoreReviewComment')
export class GameStoreReviewComment {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.gameStoreReviewComments)
  readonly writer: User;

  @ManyToOne(() => GameStoreReview, (review) => review.comments)
  readonly review: GameStoreReview;

  @Column()
  content: string;
}
