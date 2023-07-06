import { Board } from 'src/boards/entities/board.entity';
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

  @ManyToMany(() => Board)
  likedBoards: Board[];
}
