import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';

@Entity('AssetCategory')
export class AssetCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Asset, (asset) => asset.category, {})
  assets: Asset[];
}
