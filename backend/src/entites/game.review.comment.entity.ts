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
import { GameReviewCommentLikeRelation } from './game.review.comment.like.relation';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @ApiProperty({ description: '싫어요 수', example: 4 })
  @Column({ nullable: false, default: 0 })
  unlikeCount: number;

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

  @OneToMany(
    () => GameReviewCommentLikeRelation,
    (relation) => relation.comment,
    { cascade: true },
  )
  likeRelations: Array<GameReviewCommentLikeRelation>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
