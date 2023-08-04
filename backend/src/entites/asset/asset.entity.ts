import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetReview } from './asset.review.entity';
import { AssetLike } from './asset.like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { AssetCost } from './asset.cost.entity';

@Entity('Asset')
export class Asset {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AssetReview, (review) => review.asset, { cascade: true })
  reviews: AssetReview[];

  @OneToOne(() => AssetCost, (cost) => cost.asset, { cascade: true })
  cost: AssetCost;

  @OneToMany(() => AssetLike, (like) => like.asset, { cascade: true })
  likes: AssetLike[];

  @ApiProperty({ description: '제목', example: '포탈' })
  @Column()
  title: string;

  @ApiProperty({ description: '설명', example: '포탈 설명' })
  @Column()
  description: string;

  @ApiProperty({ description: '제작자', example: '발브' })
  @ManyToOne(() => User, (user) => user.assets, { onDelete: 'CASCADE' })
  author: User;

  @ApiProperty({ description: '다운로드 링크', example: 'https://portal.com' })
  @Column()
  downloadUrl: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일' })
  @DeleteDateColumn()
  deletedAt?: Date | null;
}
