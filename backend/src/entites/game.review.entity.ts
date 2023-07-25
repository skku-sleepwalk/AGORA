import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameReviewComment } from './game.review.comment.entity';
import { User } from './user.entity';
import { GameReviewLikeRelation } from './game.review.like.relation';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

@Entity('GameReview')
export class GameReview {
  @ApiProperty({
    description: '아이디',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.gameReviews)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  readonly author: User;

  @ManyToOne(() => Game, (game) => game.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameStoreId', referencedColumnName: 'id' }])
  readonly game: Game;

  @OneToMany(() => GameReviewLikeRelation, (relation) => relation.gameReview, {
    cascade: true,
  })
  likeRelations: Array<GameReviewLikeRelation>;

  @OneToMany(() => GameReviewComment, (comment) => comment.review, {
    cascade: true,
  })
  comments: Array<GameReviewComment>;

  @ApiProperty({ example: '재미있어요', description: '리뷰 내용' })
  @Column({ nullable: false })
  content: string;

  @ApiProperty({ example: 3, description: '좋아요 수' })
  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @ApiProperty({ example: 4, description: '싫어요 수' })
  @Column({ nullable: false, default: 0 })
  unlikeCount: number;

  @ApiProperty({ description: '댓글 수', example: 5 })
  commentCount: number;

  @ApiProperty({ example: 4, description: '별점' })
  @Column({ nullable: false })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
