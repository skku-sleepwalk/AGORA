import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user.entity';

@Entity('AssetBuyHistory')
export class AssetBuyHistory {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Asset, (asset) => asset.buyHistories, {
    onDelete: 'CASCADE',
  })
  readonly asset: Asset;

  @ManyToOne(() => User, (user) => user.assetBuyHistories, {
    onDelete: 'CASCADE',
  })
  readonly user: User;

  @CreateDateColumn()
  readonly createdAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
