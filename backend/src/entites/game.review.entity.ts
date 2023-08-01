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
import { GameReviewLike } from './game.review.like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';
import { GameReviewDislike } from './game.review.dislike.entity';
import { UserDto } from 'src/common/dto/user.dto';

@Entity('GameReview')
export class GameReview {
  @ApiProperty({
    description: '아이디',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.gameReviews)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  readonly author: UserDto;

  @ManyToOne(() => Game, (game) => game.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  readonly game: Game;

  @OneToMany(() => GameReviewLike, (relation) => relation.review, {
    cascade: true,
  })
  likes: Array<GameReviewLike>;

  @OneToMany(() => GameReviewDislike, (relation) => relation.review, {
    cascade: true,
  })
  dislikes: Array<GameReviewDislike>;

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

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일자' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일자' })
  @DeleteDateColumn()
  deletedAt?: Date | null;
}
