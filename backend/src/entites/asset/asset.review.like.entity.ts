import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user.entity';
import { AssetReview } from './asset.review.entity';

@Entity('AssetReviewLike')
export class AssetReviewLike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => AssetReview, (review) => review.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  review: AssetReview;

  @ManyToOne(() => User, (user) => user.assetLikes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
