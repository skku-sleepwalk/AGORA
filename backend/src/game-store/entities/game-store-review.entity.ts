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

  @ManyToOne(() => GameStore, (gameStore) => gameStore.gameStoreReviews, {
    onDelete: 'CASCADE',
  })
  readonly gameStore: GameStore;

  @OneToMany(
    () => GameStoreReviewLikeRelation,
    (relation) => relation.gameStoreReview,
    { cascade: true },
  )
  likeRelations: Array<GameStoreReviewLikeRelation>;

  @OneToMany(() => GameStoreReviewComment, (comment) => comment.review, {
    cascade: true,
  })
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

  @ManyToOne(() => GameStoreReview, (review) => review.likeRelations, {
    onDelete: 'CASCADE',
  })
  readonly gameStoreReview: GameStoreReview;

  @ManyToOne(() => User, (user) => user.gameStoreReviewLikeRelations, {
    onDelete: 'CASCADE',
  })
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

  @ManyToOne(() => User, (user) => user.gameStoreReviewComments, {
    onDelete: 'CASCADE',
  })
  readonly writer: User;

  @ManyToOne(() => GameStoreReview, (review) => review.comments, {
    onDelete: 'CASCADE',
  })
  readonly review: GameStoreReview;

  @OneToMany(
    () => GameStoreReviewCommentLikeRelation,
    (relation) => relation.comment,
    { cascade: true },
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

  @ManyToOne(() => GameStoreReviewComment, (comment) => comment.likeRelations, {
    onDelete: 'CASCADE',
  })
  readonly comment: GameStoreReviewComment;

  @ManyToOne(() => User, (user) => user.gameStoreReviewCommentLikeRelations, {
    onDelete: 'CASCADE',
  })
  readonly user: User;

  @Column({ nullable: true })
  likeAction: LikeAction;
}
