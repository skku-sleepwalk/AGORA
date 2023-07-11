import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetStoreCategory } from '../asset-store-category/entities/asset-store-category.entity';

@Entity()
export class AssetStoreBoards {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('varchar', { array: true })
  downloadUrl: string[];

  @Column()
  price: number;

  @Column()
  like: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @OneToMany(
    () => AssetStoreReviews,
    (assetStoreReviews) => assetStoreReviews.AssetStoreBoard,
  )
  assetStoreReviews: AssetStoreReviews[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author' })
  readonly author: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: User[];

  @ManyToMany(() => AssetStoreCategory)
  @JoinTable()
  categoryTypes: AssetStoreCategory[];
}

@Entity()
export class AssetStoreReviews {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    },
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'writer' })
  readonly writer: User;

  @ManyToOne(() => AssetStoreBoards)
  readonly AssetStoreBoard: AssetStoreBoards;
}

export type AssetStoreBoardsOrder = 'createdAt' | 'like' | null;
