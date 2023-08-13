import { ApiProperty } from '@nestjs/swagger';
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
import { User } from '../user.entity';
import { AssetReview } from './asset.review.entity';
import { AssetReviewCommentLike } from './asset.review.comment.like.entity';
import { GameReviewCommentDislike } from '../game/game.review.comment.dislike.entity';

@Entity('AssetReviewComment')
export class AssetReviewComment {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({
    description: '리뷰 댓글 내용',
    example: '후기가 정말 도움이 되었어요!',
  })
  @Column()
  content: string;

  @ApiProperty({ description: '작성자', type: () => User })
  @ManyToOne(() => User, (user) => user.assetReviewComments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  readonly author: User;

  @ManyToOne(() => AssetReview, (review) => review.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  readonly review: AssetReview;

  @OneToMany(() => AssetReviewCommentLike, (relation) => relation.comment, {
    cascade: true,
  })
  likes: Array<AssetReviewCommentLike>;

  @OneToMany(() => GameReviewCommentDislike, (relation) => relation.comment, {
    cascade: true,
  })
  dislikes: Array<GameReviewCommentDislike>;

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
