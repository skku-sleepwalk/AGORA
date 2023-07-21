import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameStore } from './game-store.entity';
import { LikeAction } from './game-store-review.entity';

@Entity('GameStoreBoard')
export class GameStoreBoard {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  likeCount: number;

  @Column({ nullable: false, default: 0 })
  child: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @OneToMany(
    () => GameStoreBoardLikeRelation,
    (relation) => relation.gameStoreBoard,
  )
  likeRelations: Array<GameStoreBoardLikeRelation>;

  @ManyToOne(() => GameStore, (gameStore) => gameStore.gameStoreBoards)
  gameStore: GameStore;

  @ManyToOne(() => User, (user) => user.boards)
  writer: User;

  @ManyToOne(() => GameStoreBoard, { nullable: true })
  parent: GameStoreBoard;

  @OneToMany(() => GameStoreBoard, (board) => board.parent)
  children: Array<GameStoreBoard>;

  @ManyToMany(() => GameStoreBoardCategory)
  @JoinTable()
  categoryTypes: Array<GameStoreBoardCategory>;
}

@Entity('GameStoreBoardCategory')
export class GameStoreBoardCategory {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false, unique: true })
  readonly name: string;

  @ManyToMany(() => GameStoreBoard)
  boards: Array<GameStoreBoard>;
}

@Entity('GameStoreBoardLikeRelations')
export class GameStoreBoardLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameStoreBoard, { nullable: false })
  readonly gameStoreBoard: GameStoreBoard;

  @ManyToOne(() => User, { nullable: false })
  readonly user: User;

  @Column({ nullable: true, default: null })
  likeAction: LikeAction;
}
