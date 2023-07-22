import {
  AssetStoreBoards,
  AssetStoreReviews,
} from 'src/asset-store/entities/asset-store.entity';
import { Board } from 'src/developer-community/entities/developer-community-board.entity';
import {
  GameStoreBoard,
  GameStoreBoardLikeRelation,
} from 'src/game-store/entities/game-store-board.entity';
import {
  GameStoreReview,
  GameStoreReviewComment,
  GameStoreReviewCommentLikeRelation,
} from 'src/game-store/entities/game-store-review.entity';
import {
  GameStore,
  GameStoreTagRelation,
  PlayTimeRelation,
} from 'src/game-store/entities/game-store.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 32, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  token: number;

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Board, (board) => board.writer)
  boards: Board[];

  @OneToMany(() => GameStore, (board) => board.author)
  gameStores: Array<GameStore>;

  @OneToMany(() => PlayTimeRelation, (relation) => relation.user)
  playtimeRelations: Array<PlayTimeRelation>;

  @OneToMany(() => GameStoreTagRelation, (relation) => relation.user)
  gameStoreTagRelations: Array<GameStoreTagRelation>;

  @OneToMany(() => GameStoreReview, (review) => review.writer)
  gameStoreReviews: Array<GameStoreReview>;

  @OneToMany(() => GameStoreBoardLikeRelation, (relation) => relation.user)
  gameStoreReviewLikeRelations: Array<GameStoreBoardLikeRelation>;

  @OneToMany(() => GameStoreReviewComment, (comment) => comment.writer)
  gameStoreReviewComments: Array<GameStoreReviewComment>;

  @OneToMany(
    () => GameStoreReviewCommentLikeRelation,
    (relation) => relation.user,
  )
  gameStoreReviewCommentLikeRelations: Array<GameStoreReviewCommentLikeRelation>;

  @OneToMany(() => GameStoreBoard, (board) => board.writer)
  gameStoreBoards: Array<GameStoreBoard>;

  @OneToMany(() => GameStoreBoardLikeRelation, (relation) => relation.user)
  gameStoreBoardLikeRelations: Array<GameStoreBoardLikeRelation>;

  @OneToMany(() => AssetStoreBoards, (board) => board.author)
  AssetStoreBoards: AssetStoreBoards[];

  @OneToMany(
    () => AssetStoreReviews,
    (assetSotreReviews) => assetSotreReviews.writer,
  )
  AssetStoreReviews: AssetStoreReviews[];

  @ManyToMany(() => Board)
  likedBoards: Board[];

  @ManyToMany(() => GameStore)
  likeGames: Array<GameStore>;

  @ManyToMany(() => AssetStoreBoards)
  likedAssetStoreBoards: AssetStoreBoards[];
}
