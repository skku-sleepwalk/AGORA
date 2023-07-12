import { AssetStoreBoards } from 'src/asset-store/entities/asset-store.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('AssetStoreCategory')
export class AssetStoreCategory {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => AssetStoreBoards)
  assetStoreBoards: AssetStoreBoards[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt?: Date | null;
}
