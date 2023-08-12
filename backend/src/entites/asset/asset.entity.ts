import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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
import { AssetTagRelation } from './asset.tag.relation.entity';
import { AssetCategory } from './asset.category.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

@Entity('Asset')
export class Asset {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AssetReview, (review) => review.asset, { cascade: true })
  reviews: AssetReview[];

  @ApiProperty({ description: '가격', type: () => AssetCost })
  @ValidateNested()
  @OneToOne(() => AssetCost, (cost) => cost.asset, { cascade: true })
  cost: AssetCost;

  @OneToMany(() => AssetLike, (like) => like.asset, { cascade: true })
  likes: AssetLike[];

  @ApiProperty({ description: '썸네일', example: 'https://portal.com' })
  @IsNotEmpty()
  @IsUrl()
  @Column()
  thumbnail: string;

  @ApiProperty({ description: '제목', example: '포탈' })
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @ApiProperty({ description: '설명', example: '포탈 설명' })
  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @ApiProperty({
    description: '민감한 주제의 표현을 포함하는지 여부',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  isSensitive: boolean;

  @ApiProperty({ description: '제작자', example: '발브' })
  @ManyToOne(() => User, (user) => user.assets, { onDelete: 'CASCADE' })
  author: User;

  @ApiProperty({ description: '다운로드 링크', example: 'https://portal.com' })
  @IsNotEmpty()
  @IsUrl()
  @Column()
  downloadUrl: string;

  @ManyToOne(() => AssetCategory, (category) => category.assets, {})
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: AssetCategory;

  @OneToMany(() => AssetTagRelation, (relation) => relation.asset, {
    cascade: true,
  })
  tagRelations: AssetTagRelation[];

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
