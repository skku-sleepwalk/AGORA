import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user.entity';
import { AssetReviewComment } from './asset.review.comment.entity';

@Entity('AssetReviewCommentDislike')
export class AssetReviewCommentDislike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => AssetReviewComment, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'assetId', referencedColumnName: 'id' }])
  comment: AssetReviewComment;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
