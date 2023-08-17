import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommunityBoard } from './community/community.board.entity';
import { CommunityBoardLike } from './community/community.board.like.entity';
import { Game } from './game/game.entity';
import { GameStore } from './game/game.store.entity';
import { PlayTime } from './game/game.playtime.entity';
import { GameTagRelation } from './game/game.tag.relation.entity';
import { GameShoppingCartItem } from './game/game.shoppingCart.entity';
import { GameReview } from './game/game.review.entity';
import { GameReviewLike } from './game/game.review.like.entity';
import { GameReviewDislike } from './game/game.review.dislike.entity';
import { GameReviewComment } from './game/game.review.comment.entity';
import { GameReviewCommentLike } from './game/game.review.comment.like.entity';
import { GameReviewCommentDislike } from './game/game.review.comment.dislike.entity';
import { GameBoard } from './game/game.board.entity';
import { GameBoardLike } from './game/game.board.like.entity';
import { GameLike } from './game/game.like.entity';
import { Asset } from './asset/asset.entity';
import { AssetReview } from './asset/asset.review.entity';
import { AssetReviewComment } from './asset/asset.review.comment.entity';
import { UserSubscribe } from './user.subscribe.entity';
import { AssetSearchHistory } from './asset/asset.search.history.entity';
import { AssetTagRelation } from './asset/asset.tag.relation.entity';
import { AssetLike } from './asset/asset.like.entity';
import { AssetReviewLike } from './asset/asset.review.like.entity';
import { AssetReviewDislike } from './asset/asset.review.dislike.entity';
import { AssetReviewCommentLike } from './asset/asset.review.comment.like.entity';
import { AssetReviewCommentDislike } from './asset/asset.review.comment.dislike.entity';
import { AssetDownloadHistory } from './asset/asset.download.history.entity';
import { AssetBuyHistory } from './asset/asset.buy.history.entity';

@Entity('User')
export class User {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a', description: '유저 이름' })
  @Column({ length: 32 })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'a@gmail.com', description: '유저 이메일' })
  @Column({ unique: true, nullable: false })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678',
    description: '비밀번호',
    required: true,
  })
  @Column({ nullable: true })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'i am a developer', description: '유저 설명' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 0, description: '토큰(재화)량' })
  @Column({ default: 0 })
  token: number;

  @ApiProperty({ example: 30, description: '행동 점수' })
  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => UserSubscribe, (relation) => relation.user, {
    cascade: true,
  })
  subscribe: Array<UserSubscribe>;

  @OneToMany(() => CommunityBoard, (board) => board.author, { cascade: true })
  communityBoards: CommunityBoard[];

  @OneToMany(() => CommunityBoardLike, (relation) => relation.user, {
    cascade: true,
  })
  communityBoardLikes: Array<CommunityBoardLike>;

  @OneToMany(() => Game, (game) => game.author, { cascade: true })
  games: Array<Game>;

  @OneToMany(() => GameStore, (board) => board.author, { cascade: true })
  gameStores: Array<GameStore>;

  @OneToMany(() => PlayTime, (relation) => relation.user, { cascade: true })
  playtimes: Array<PlayTime>;

  @OneToMany(() => GameTagRelation, (relation) => relation.user, {
    cascade: true,
  })
  gameTagRelations: Array<GameTagRelation>;

  @OneToMany(() => GameShoppingCartItem, (item) => item.user, { cascade: true })
  gameShoppingCartItems: GameShoppingCartItem[];

  @OneToMany(() => GameReview, (review) => review.author, { cascade: true })
  gameReviews: Array<GameReview>;

  @OneToMany(() => GameReviewLike, (relation) => relation.user, {
    cascade: true,
  })
  gameReviewLikes: Array<GameReviewLike>;

  @OneToMany(() => GameReviewDislike, (relation) => relation.user, {
    cascade: true,
  })
  gameReviewDislikes: Array<GameReviewDislike>;

  @OneToMany(() => GameReviewComment, (comment) => comment.author, {
    cascade: true,
  })
  gameReviewComments: Array<GameReviewComment>;

  @OneToMany(() => GameReviewCommentLike, (relation) => relation.user, {
    cascade: true,
  })
  gameReviewCommentLikes: Array<GameReviewCommentLike>;

  @OneToMany(() => GameReviewCommentDislike, (relation) => relation.user, {
    cascade: true,
  })
  gameReviewCommentDislikes: Array<GameReviewCommentDislike>;

  @OneToMany(() => GameBoard, (board) => board.author, {
    cascade: true,
  })
  gameBoards: Array<GameBoard>;

  @OneToMany(() => GameBoardLike, (relation) => relation.user, {
    cascade: true,
  })
  gameBoardLikes: Array<GameBoardLike>;

  @OneToMany(() => GameLike, (relation) => relation.user, {
    cascade: true,
  })
  gameLikes: Array<GameLike>;

  @OneToMany(() => Asset, (asset) => asset.author, {
    cascade: true,
  })
  assets: Array<Asset>;

  @OneToMany(() => AssetLike, (relation) => relation.user, {
    cascade: true,
  })
  assetLikes: Array<AssetLike>;

  @OneToMany(() => AssetTagRelation, (relation) => relation.user, {})
  assetTagRelations: Array<AssetTagRelation>;

  @OneToMany(() => AssetSearchHistory, (search) => search.user, {
    cascade: true,
  })
  assetSearchHistories: Array<AssetSearchHistory>;

  @OneToMany(() => AssetReview, (review) => review.author, {
    cascade: true,
  })
  assetReviews: Array<AssetReview>;

  @OneToMany(() => AssetReviewLike, (relation) => relation.user, {
    cascade: true,
  })
  assetReviewLikes: Array<AssetReviewLike>;

  @OneToMany(() => AssetReviewDislike, (relation) => relation.user, {
    cascade: true,
  })
  assetReviewDislikes: Array<AssetReviewDislike>;

  @OneToMany(() => AssetReviewComment, (comment) => comment.author, {
    cascade: true,
  })
  assetReviewComments: Array<AssetReviewComment>;

  @OneToMany(() => AssetReviewCommentLike, (relation) => relation.user, {
    cascade: true,
  })
  assetReviewCommentLikes: Array<AssetReviewCommentLike>;

  @OneToMany(() => AssetReviewCommentDislike, (relation) => relation.user, {
    cascade: true,
  })
  assetReviewCommentDislikes: Array<AssetReviewCommentDislike>;

  @OneToMany(() => AssetDownloadHistory, (history) => history.user, {
    cascade: true,
  })
  assetDownloadHistories: Array<AssetDownloadHistory>;

  @OneToMany(() => AssetBuyHistory, (history) => history.user, {
    cascade: true,
  })
  assetBuyHistories: Array<AssetBuyHistory>;
}
