import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { AssetTag } from './asset.tag.entity';

@Entity('AssetTagRelation')
export class AssetTagRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset, (asset) => asset.tagRelations, {
    onDelete: 'CASCADE',
  })
  asset: Asset;

  @ManyToOne(() => AssetTag, (tag) => tag.relations, { onDelete: 'CASCADE' })
  tag: AssetTag;
}
