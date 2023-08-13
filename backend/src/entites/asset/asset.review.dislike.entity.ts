import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user.entity';
import { AssetReview } from './asset.review.entity';

@Entity('AssetReviewDislike')
export class AssetReviewDislike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => AssetReview, (review) => review.dislikes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  review: AssetReview;

  @ManyToOne(() => User, (user) => user.assetReviewDislikes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
