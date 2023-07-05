import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
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

  @Column()
  @Generated('increment')
  readonly _id?: number;

  @Column({ length: 32, nullable: true })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @Column({ nullable: false, default: 0 })
  child: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
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
}
export type Order = '_id' | 'child' | 'like';
