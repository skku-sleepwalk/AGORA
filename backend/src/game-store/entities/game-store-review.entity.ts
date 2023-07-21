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

export type LikeAction = 'like' | 'unlike' | null;

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
  likeRelations: Array<GameStoreReviewLikeRelation>;

  @OneToMany(() => GameStoreReviewComment, (comment) => comment.review)
  comments: Array<GameStoreReviewComment>;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @Column({ nullable: false, default: 0 })
  unlikeCount: number;

  @Column({ nullable: false })
  rating: number;

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

  @ManyToOne(() => GameStoreReview, (review) => review.likeRelations)
  readonly gameStoreReview: GameStoreReview;

  @ManyToOne(() => User, (user) => user.gameStoreReviewLikeRelations)
  readonly user: User;

  @Column({ nullable: true })
  likeAction: LikeAction;
}

@Entity('GameStoreReviewComment')
export class GameStoreReviewComment {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @Column({ nullable: false, default: 0 })
  unlikeCount: number;

  @ManyToOne(() => User, (user) => user.gameStoreReviewComments)
  readonly writer: User;

  @ManyToOne(() => GameStoreReview, (review) => review.comments)
  readonly review: GameStoreReview;

  @OneToMany(
    () => GameStoreReviewCommentLikeRelation,
    (relation) => relation.comment,
  )
  likeRelations: Array<GameStoreReviewCommentLikeRelation>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}

@Entity('GameStoreReviewCommentLikeRelation')
export class GameStoreReviewCommentLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameStoreReviewComment, (comment) => comment.likeRelations)
  readonly comment: GameStoreReviewComment;

  @ManyToOne(() => User, (user) => user.gameStoreReviewCommentLikeRelations)
  readonly user: User;

  @Column({ nullable: true })
  likeAction: LikeAction;
}
