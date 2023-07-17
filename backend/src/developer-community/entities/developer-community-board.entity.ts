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
import { CategoryType } from '../developer-community-category/entities/developer-community-category.entity';
import { User } from 'src/users/entities/user.entity';
@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 32, nullable: true })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @Column({ nullable: false, default: 0 })
  child: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.boards)
  writer: User;

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
