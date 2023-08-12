import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@Entity('AssetCost')
export class AssetCost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '무료 여부', example: false })
  @IsNotEmpty()
  @IsBoolean()
  @Column('bool', { nullable: false })
  isFree: boolean;

  @ApiProperty({ description: '원래 가격', example: 3000 })
  @Column({ nullable: true, default: 0 })
  defaultPrice: number;

  @ApiProperty({ description: '할인 여부', example: true })
  @Column('bool', { nullable: true, default: false })
  isSale: boolean;

  @ApiProperty({ description: '할인율', example: 10 })
  @Column({ nullable: true })
  salePercentage: number;

  @ApiProperty({ description: '할인 가격', example: 2700 })
  @Column({ nullable: true })
  saledPrice: number;

  @ApiProperty({ description: '할인 시작 일자' })
  @Column({ nullable: true })
  saleStartAt: Date;

  @ApiProperty({ description: '할인 끝 일자' })
  @Column({ nullable: true })
  saleEndAt: Date;

  @OneToOne(() => Asset, (asset) => asset.cost, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assetId', referencedColumnName: 'id' })
  asset: Asset;
}
