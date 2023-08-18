import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { User } from '../user.entity';

@Entity('AssetDownloadHistory')
export class AssetDownloadHistory {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Asset, (asset) => asset.downloadHistories, {
    onDelete: 'CASCADE',
  })
  readonly asset: Asset;

  @ManyToOne(() => User, (user) => user.assetDownloadHistories, {
    onDelete: 'CASCADE',
  })
  readonly user: User;

  @CreateDateColumn()
  readonly createdAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
