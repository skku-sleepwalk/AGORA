import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommunityBoard } from './community.board.entity';
import { GameStore } from './game.store.entity';
import { PlayTime } from './game.playtime.entity';
import { GameTagRelation } from './game.tag.relation.entity';
import { GameShoppingCartItem } from './game.shoppingCart.entity';
import { GameReview } from './game.review.entity';
import { GameBoardLike } from './game.board.like.entity';
import { GameReviewComment } from './game.review.comment.entity';
import { GameReviewLike } from './game.review.like.entity';
import { GameBoard } from './game.board.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommunityBoardLike } from './community.board.like.entity';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Game } from './game.entity';
import { GameLike } from './game.like.entity';
import { GameReviewDislike } from './game.review.dislike.entity';
import { GameReviewCommentDislike } from './game.review.comment.dislike.entity';
import { GameReviewCommentLike } from './game.review.comment.like.entity';

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

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   example: '12345678',
  //   description: '비밀번호',
  //   required: true,
  // })
  // @Column({ nullable: false })
  // password: string;

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
}
