import {
  AssetStoreBoards,
  AssetStoreReviews,
} from 'src/asset-store/entities/asset-store.entity';
import { Board } from 'src/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 32, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  token: number;

  @Column({ default: 0 })
  rating: number;

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
  deletedAt: Date | null;

  @OneToMany(() => Board, (board) => board.writer)
  boards: Board[];

  @OneToMany(
    () => AssetStoreBoards,
    (assetStoreBoard) => assetStoreBoard.author,
  )
  AssetStoreBoards: AssetStoreBoards[];

  @OneToMany(
    () => AssetStoreReviews,
    (assetSotreReviews) => assetSotreReviews.writer,
  )
  AssetStoreReviews: AssetStoreReviews[];

  @ManyToMany(() => Board)
  likedBoards: Board[];

  @ManyToMany(() => AssetStoreBoards)
  likedAssetStoreBoards: AssetStoreBoards[];
}
