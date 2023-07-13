import {
  AssetStoreBoards,
  AssetStoreReviews,
} from 'src/asset-store/entities/asset-store.entity';
import { Board } from 'src/developer-community/entities/developer-community-board.entity';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
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
