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
import { CategoryType } from '../category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 32, nullable: true })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @Column({ nullable: false, default: 0 })
  child: number;

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
  deletedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.boards)
  readonly writer: User;

  @ManyToOne(() => Board, { nullable: true })
  parent: Board;

  @OneToMany(() => Board, (board) => board.parent)
  children: Board[];

  @ManyToMany(() => CategoryType)
  @JoinTable()
  categoryTypes: CategoryType[];

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: User[];
}

export type Order = 'createdAt' | 'child' | 'like' | null;
export type BoardType = 'parent' | 'child';
