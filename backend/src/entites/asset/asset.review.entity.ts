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
import { Asset } from './asset.entity';
import { User } from '../user.entity';
import { AssetReviewComment } from './asset.review.comment.entity';
import { AssetReviewLike } from './asset.review.like.entity';
import { AssetReviewDislike } from './asset.review.dislike.entity';

@Entity('AssetReview')
export class AssetReview {
  @ApiProperty({
    description: '아이디',
    example: 'f7c2a0e0-0d9a-4c9a-8b1a-3b6b4b0b2b2b',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.reviews)
  @JoinColumn({ name: 'assetId', referencedColumnName: 'id' })
  asset: Asset;

  @ApiProperty({ description: '내용', example: '좋아요' })
  @Column()
  content: string;

  @ApiProperty({ description: '평점', example: 5 })
  @Column()
  rating: number;

  @ApiProperty({ description: '작성자', type: () => User })
  @ManyToOne(() => User, (user) => user.assetReviews)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: User;

  @OneToMany(() => AssetReviewComment, (comment) => comment.review, {
    cascade: true,
  })
  comments: AssetReviewComment[];

  @OneToMany(() => AssetReviewLike, (relation) => relation.review, {
    cascade: true,
  })
  likes: AssetReviewLike[];

  @OneToMany(() => AssetReviewDislike, (relation) => relation.review, {
    cascade: true,
  })
  dislikes: AssetReviewDislike[];

  @ApiProperty({ description: '생성일', example: '2021-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2021-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일', example: '2021-01-01T00:00:00.000Z' })
  @DeleteDateColumn()
  deletedAt: Date;
}
