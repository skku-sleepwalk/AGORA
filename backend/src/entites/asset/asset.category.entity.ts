import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from './asset.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('AssetCategory')
export class AssetCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '카테고리 이름' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @OneToMany(() => Asset, (asset) => asset.category, {})
  assets: Asset[];
}
