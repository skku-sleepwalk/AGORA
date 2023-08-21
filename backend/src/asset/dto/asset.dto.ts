import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';

export class AssetDto extends PickType(Asset, [
  'id',
  'author',
  'title',
  'description',
  'cost',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;

  @ApiProperty({ description: '인기 태그', type: AssetTag, isArray: true })
  @IsNotEmpty()
  popularTags?: AssetTag[];
}
