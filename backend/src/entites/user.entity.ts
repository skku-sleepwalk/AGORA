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
import { CommunityBoard } from './community.board.entity';
import { GameStore } from './game.store.entity';
import { PlayTimeRelation } from './game.playtime.relation.entity';
import { GameTagRelation } from './game.tag.relation.entity';
import { GameShoppingCartItem } from './game.shoppingCart.entity';
import { GameReview } from './game.review.entity';
import { GameBoardLikeRelation } from './game.board.like.relation.entity';
import { GameReviewComment } from './game.review.comment.entity';
import { GameReviewLikeRelation } from './game.review.like.relation';
import { GameBoard } from './game.board.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommunityBoardLikeRelation } from './community.board.like.relation';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Game } from './game.entity';

@Entity('User')
export class User {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a', description: '유저 이름' })
  @Column({ length: 32, unique: true })
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

  @ApiProperty({ example: 300, description: '플레이 시간(분단위)' })
  @Column({ default: 0 })
  totalPlaytime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => CommunityBoard, (board) => board.author)
  communityBoards: CommunityBoard[];

  @OneToMany(() => CommunityBoardLikeRelation, (relation) => relation.user)
  communityBoardLikeRelations: Array<CommunityBoardLikeRelation>;

  @OneToMany(() => Game, (game) => game.author)
  games: Array<Game>;

  @OneToMany(() => GameStore, (board) => board.author)
  gameStores: Array<GameStore>;

  @OneToMany(() => PlayTimeRelation, (relation) => relation.user)
  playtimeRelations: Array<PlayTimeRelation>;

  @OneToMany(() => GameTagRelation, (relation) => relation.user)
  gameTagRelations: Array<GameTagRelation>;

  @OneToMany(() => GameShoppingCartItem, (item) => item.user)
  gameShoppingCartItems: GameShoppingCartItem[];

  @OneToMany(() => GameReview, (review) => review.author)
  gameReviews: Array<GameReview>;

  @OneToMany(() => GameBoardLikeRelation, (relation) => relation.user)
  gameReviewLikeRelations: Array<GameBoardLikeRelation>;

  @OneToMany(() => GameReviewComment, (comment) => comment.author)
  gameReviewComments: Array<GameReviewComment>;

  @OneToMany(() => GameReviewLikeRelation, (relation) => relation.user)
  gameReviewCommentLikeRelations: Array<GameReviewLikeRelation>;

  @OneToMany(() => GameBoard, (board) => board.author)
  gameBoards: Array<GameBoard>;

  @OneToMany(() => GameBoardLikeRelation, (relation) => relation.user)
  gameBoardLikeRelations: Array<GameBoardLikeRelation>;

  @ManyToMany(() => GameStore, (gameStore) => gameStore.likedUsers)
  likeGames: Array<GameStore>;
}
