import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { AssetTag } from './asset.tag.entity';
import { User } from '../user.entity';

@Entity('AssetTagRelation')
export class AssetTagRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.assetTagRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Asset, (asset) => asset.tagRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assetId', referencedColumnName: 'id' })
  asset: Asset;

  @ManyToOne(() => AssetTag, (tag) => tag.relations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId', referencedColumnName: 'id' })
  tag: AssetTag;
}
