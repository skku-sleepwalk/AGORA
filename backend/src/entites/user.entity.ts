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
  @Column({ nullable: false })
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

  @OneToMany(() => UserSubscribe, (relation) => relation.user)
  subscribe: Array<UserSubscribe>;

  @OneToMany(() => CommunityBoard, (board) => board.author)
  communityBoards: CommunityBoard[];

  @OneToMany(() => CommunityBoardLike, (relation) => relation.user)
  communityBoardLikes: Array<CommunityBoardLike>;

  @OneToMany(() => Game, (game) => game.author)
  games: Array<Game>;

  @OneToMany(() => GameStore, (board) => board.author)
  gameStores: Array<GameStore>;

  @OneToMany(() => PlayTime, (relation) => relation.user)
  playtimes: Array<PlayTime>;

  @OneToMany(() => GameTagRelation, (relation) => relation.user)
  gameTagRelations: Array<GameTagRelation>;

  @OneToMany(() => GameShoppingCartItem, (item) => item.user)
  gameShoppingCartItems: GameShoppingCartItem[];

  @OneToMany(() => GameReview, (review) => review.author)
  gameReviews: Array<GameReview>;

  @OneToMany(() => GameReviewLike, (relation) => relation.user)
  gameReviewLikes: Array<GameReviewLike>;

  @OneToMany(() => GameReviewDislike, (relation) => relation.user)
  gameReviewDislikes: Array<GameReviewDislike>;

  @OneToMany(() => GameReviewComment, (comment) => comment.author)
  gameReviewComments: Array<GameReviewComment>;

  @OneToMany(() => GameReviewCommentLike, (relation) => relation.user)
  gameReviewCommentLikes: Array<GameReviewCommentLike>;

  @OneToMany(() => GameReviewCommentDislike, (relation) => relation.user)
  gameReviewCommentDislikes: Array<GameReviewCommentDislike>;

  @OneToMany(() => GameBoard, (board) => board.author)
  gameBoards: Array<GameBoard>;

  @OneToMany(() => GameBoardLike, (relation) => relation.user)
  gameBoardLikes: Array<GameBoardLike>;

  @OneToMany(() => GameLike, (relation) => relation.user)
  gameLikes: Array<GameLike>;

  @OneToMany(() => Asset, (asset) => asset.author)
  assets: Array<Asset>;

  @OneToMany(() => AssetReview, (review) => review.author)
  assetReviews: Array<AssetReview>;

  @OneToMany(() => AssetReviewComment, (comment) => comment.author)
  assetReviewComments: Array<AssetReviewComment>;
}
