import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType } from '../category/entities/category.entity';
@Entity('Board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  @Generated('increment')
  readonly _id?: number;

  @Column('varchar')
  readonly writerEmail: string;

  @Column({ nullable: true, type: 'varchar' })
  readonly parentId: string;

  @Column({ length: 32 })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: false, default: 0 })
  like: number;

  @Column({ nullable: false, default: 0 })
  child: number;

  @Column('varchar', { array: true, nullable: false, default: [] })
  categoryNames: Array<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
export type Order = '_id' | 'child' | 'like';
