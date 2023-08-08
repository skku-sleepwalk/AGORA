import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetTagRelation } from './asset.tag.relation.entity';

@Entity('AssetTag')
export class AssetTag {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '태그명', example: '바다' })
  @Column()
  name: string;

  @OneToMany(() => AssetTagRelation, (relation) => relation.tag, {
    cascade: true,
  })
  relations: AssetTagRelation[];

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일' })
  @DeleteDateColumn()
  deletedAt: Date;
}
