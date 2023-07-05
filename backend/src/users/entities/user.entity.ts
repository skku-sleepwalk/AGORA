import { Board } from 'src/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  email?: string;

  @Column({ default: 0 })
  token: number;

  @Column({ default: 0 })
  rating: number;

  @OneToMany(() => Board, (board) => board.writer)
  boards: Board[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
