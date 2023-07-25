import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommunityBoard } from './community.board.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('CommunityCategory')
export class CommunityCategory {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '카테고리 이름', example: 'Unity' })
  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => CommunityBoard)
  boards: CommunityBoard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt?: Date | null;
}
