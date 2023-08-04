import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user.entity';
import { AssetReviewComment } from './asset.review.comment.entity';

@Entity('AssetReview')
export class AssetReview {
  @ApiProperty({
    description: '아이디',
    example: 'f7c2a0e0-0d9a-4c9a-8b1a-3b6b4b0b2b2b',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.reviews)
  asset: Asset;

  @ApiProperty({ description: '내용', example: '좋아요' })
  @Column()
  content: string;

  @ApiProperty({ description: '평점', example: 5 })
  @Column()
  rating: number;

  @ApiProperty({ description: '작성자', type: () => User })
  @ManyToOne(() => User, (user) => user.assetReviews)
  author: User;

  @OneToMany(() => AssetReviewComment, (comment) => comment.review, {
    cascade: true,
  })
  comments: AssetReviewComment[];
}