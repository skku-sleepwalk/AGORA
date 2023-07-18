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
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { GameStoreBoard } from './game-store-board.entity';

@Entity('GameStore')
export class GameStore {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  distributor: string;

  @Column({ nullable: false })
  developer: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @Column({ nullable: false, default: 0 })
  price: number;

  @OneToOne(() => ShortDescription)
  @JoinColumn()
  shortDescription: Relation<ShortDescription>;

  @OneToOne(() => SNSUrls)
  @JoinColumn()
  snsUrls: Relation<SNSUrls>;

  @OneToOne(() => Cost)
  @JoinColumn()
  cost: Relation<Cost>;

  @ManyToOne(() => User, (user) => user.gameStoreBoards)
  readonly author: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: Array<User>;

  @ManyToMany(() => GameStoreGenre)
  @JoinTable()
  readonly genres: Array<GameStoreGenre>;

  @OneToMany(() => GameStoreBoard, (board) => board.gameStore)
  gameStoreBoards: Array<GameStoreBoard>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}

@Entity('ShortDescription')
export class ShortDescription {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  content: string;

  @OneToOne(() => GameStore, (gameStore) => gameStore.shortDescription)
  gameStore: GameStore;
}

@Entity('SNSUrls')
export class SNSUrls {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: true })
  youtube: string | null;

  @Column({ nullable: true })
  twitch: string | null;

  @Column({ nullable: true })
  twitter: string | null;

  @Column({ nullable: true })
  discord: string | null;

  @Column({ nullable: true })
  facebook: string | null;

  @OneToOne(() => GameStore, (gameStore) => gameStore.snsUrls)
  gameStore: GameStore;
}

@Entity('Cost')
export class Cost {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('bool', { nullable: false })
  isFree: boolean;

  @Column({ nullable: true, default: 0 })
  defaultPrice: number;

  @Column('bool', { nullable: true, default: false })
  isSale: boolean;

  @Column({ nullable: true })
  salePercentage: number;

  @Column({ nullable: true })
  saledPrice: number;

  @Column({ nullable: true })
  saleStart: Date;

  @Column({ nullable: true })
  saleEnd: Date;

  @OneToOne(() => GameStore, (gameStore) => gameStore.cost)
  gameStore: GameStore;
}

@Entity('GameStoreGenre')
export class GameStoreGenre {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => GameStore)
  gameStore: Array<GameStore>;
}

// @Entity('GameStoreReviewLikeRelation')
// export class GameStoreReviewLikeRelation {
//   @PrimaryGeneratedColumn('uuid')
//   readonly id: string;

//     @ManyToOne(() => GameStore, (board) => board.likeRelations)
//     readonly gameStore: GameStore;

//   @ManyToOne(() => User, (user) => user.gameStoreLikeRelations)
//   readonly user: User;

//   @Column({ nullable: false })
//   likeAction: likeAction;
// }
