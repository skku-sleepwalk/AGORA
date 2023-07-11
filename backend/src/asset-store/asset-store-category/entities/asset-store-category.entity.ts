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

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    },
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    },
  })
  deleteAt?: Date | null;
}
