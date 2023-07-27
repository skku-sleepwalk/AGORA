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
import { User } from './user.entity';
import { GameReview } from './game.review.entity';
import { GameReviewCommentLike } from './game.review.comment.like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GameReviewCommentDislike } from './game.review.comment.dislike.entity';

@Entity('GameReviewComment')
export class GameReviewComment {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({
    description: '리뷰 댓글 내용',
    example: '후기가 정말 도움이 되었어요!',
  })
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.gameReviewComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  readonly author: User;

  @ManyToOne(() => GameReview, (review) => review.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  readonly review: GameReview;

  @OneToMany(() => GameReviewCommentLike, (relation) => relation.comment, {
    cascade: true,
  })
  likes: Array<GameReviewCommentLike>;

  @OneToMany(() => GameReviewCommentDislike, (relation) => relation.comment, {
    cascade: true,
  })
  dislikes: Array<GameReviewCommentLike>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
