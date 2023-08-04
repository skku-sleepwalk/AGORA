import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user.entity';

@Entity('AssetReviewDislike')
export class AssetReviewDislike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Asset, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'assetId', referencedColumnName: 'id' }])
  asset: Asset;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
