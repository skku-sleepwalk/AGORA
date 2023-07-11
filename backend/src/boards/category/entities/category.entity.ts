import { Board } from 'src/boards/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type CategoryBoardId = string;

@Entity('CategoryType')
export class CategoryType {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => Board)
  boards: Board[];

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
  deleteAt?: Date | null;
}
