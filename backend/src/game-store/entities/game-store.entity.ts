import {
  GameStoreShoppingCartItem,
  User,
} from 'src/users/entities/user.entity';
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
import { GameStoreReview } from './game-store-review.entity';

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
  likeCount: number;

  @Column('float', { nullable: false, default: 0 })
  rating: number;

  @Column({ nullable: false })
  price: number;

  @OneToOne(
    () => ShortDescription,
    (shortDescription) => shortDescription.gameStore,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  shortDescription: Relation<ShortDescription>;

  @OneToOne(() => SNSUrls, (snsUrls) => snsUrls.gameStore, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  snsUrls: Relation<SNSUrls>;

  @OneToOne(() => Cost, (cost) => cost.gameStore, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  cost: Relation<Cost>;

  @ManyToOne(() => User, (user) => user.gameStoreBoards)
  readonly author: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: User[];

  @ManyToMany(() => GameStoreGenre)
  @JoinTable()
  readonly genres: GameStoreGenre[];

  @ManyToMany(() => GameStoreTag, (tag) => tag.popularedGameStores)
  @JoinTable()
  popularTags: GameStoreTag[];

  @OneToMany(() => GameStoreTagRelation, (relation) => relation.gameStore, {
    cascade: true,
  })
  readonly gameStoreTagRelations: GameStoreTagRelation[];

  @OneToMany(() => GameStoreBoard, (board) => board.gameStore, {
    cascade: true,
  })
  gameStoreBoards: GameStoreBoard[];

  @OneToMany(() => GameStoreReview, (review) => review.gameStore, {
    cascade: true,
  })
  gameStoreReviews: GameStoreReview[];

  @OneToMany(() => PlayTimeRelation, (relation) => relation.gameStore, {
    cascade: true,
  })
  playtimeRelations: PlayTimeRelation[];

  @OneToMany(() => GameStoreShoppingCartItem, (item) => item.gameStore, {
    cascade: true,
  })
  shoppingCartItems: GameStoreShoppingCartItem[];

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
  id: string;

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
  id: string;

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

  @Column({ nullable: true })
  instagram: string | null;

  @Column({ nullable: true })
  customPage: string | null;

  @OneToOne(() => GameStore, (gameStore) => gameStore.snsUrls, {
    onDelete: 'CASCADE',
  })
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
  saleStartAt: Date;

  @Column({ nullable: true })
  saleEndAt: Date;

  @OneToOne(() => GameStore, (gameStore) => gameStore.cost, {
    onDelete: 'CASCADE',
  })
  gameStore: GameStore;
}

@Entity('GameStoreGenre')
export class GameStoreGenre {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => GameStore, { onDelete: 'CASCADE' })
  gameStore: Array<GameStore>;
}

@Entity('PlayTimeRelation')
export class PlayTimeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameStore, (gameStore) => gameStore.playtimeRelations, {
    onDelete: 'CASCADE',
  })
  readonly gameStore: GameStore;

  @ManyToOne(() => User, (user) => user.playtimeRelations, {
    onDelete: 'CASCADE',
  })
  readonly user: User;

  @Column({ nullable: false, default: 0 })
  playTime: number;
}

@Entity('GameStoreTag')
export class GameStoreTag {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true, nullable: false })
  readonly name: string;

  @OneToMany(() => GameStoreTagRelation, (relation) => relation.tag)
  readonly relations: Array<GameStoreTagRelation>;

  @ManyToMany(() => GameStore, (gameStore) => gameStore.popularTags)
  popularedGameStores: Array<GameStore>;
}

@Entity('GameStoreTagRelation')
export class GameStoreTagRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameStore, (gameStore) => gameStore.gameStoreTagRelations, {
    onDelete: 'CASCADE',
  })
  readonly gameStore: GameStore;

  @ManyToOne(() => GameStoreTag, (tag) => tag.relations)
  readonly tag: GameStoreTag;

  @ManyToOne(() => User, (user) => user.gameStoreTagRelations)
  readonly user: User;
}
