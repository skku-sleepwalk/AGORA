import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStoreBoard, likeAction } from './game-store-board.entity';

export interface SNSUrls {
  youtube?: string;
  twitch?: string;
  twitter?: string;
  discord?: string;
  facebook?: string;
}

export interface shortDescription {
  imageUrl: string;
  content: string;
}

export interface Cost {
  price: number;
  isSale: boolean;
  saleStart?: Date;
  saleEnd?: Date;
  salePercentage?: number;
}

@Entity('GameStore')
export class GameStore {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'json' })
  shortDescription: shortDescription;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  distributor: string;

  @Column({ nullable: false })
  developer: string;

  @Column({ nullable: false, default: 0 })
  price: number;

  @Column({ nullable: false, type: 'json' })
  cost: Cost;

  @Column({ nullable: false, type: 'json' })
  readonly snsUrls: SNSUrls;

  @ManyToOne(() => User, (user) => user.gameStoreBoards)
  readonly author: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedUser: Array<User>;

  @ManyToMany(() => GameStoreGenre)
  @JoinTable()
  genres: Array<GameStoreGenre>;

  @OneToMany(() => GameStoreBoard, (board) => board.gameStore)
  gameStoreBoards: Array<GameStoreBoard>;
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
