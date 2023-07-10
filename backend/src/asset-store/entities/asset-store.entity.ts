import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AssetStoreBoards {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  downloadUrl: string;

  @Column()
  price: number;

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
}

@Entity()
export class AssetStoreReviews {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
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
