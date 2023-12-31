import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetTagRelation } from 'src/entites/asset/asset.tag.relation.entity';

export class AssetDto extends PickType(Asset, [
  'id',
  'author',
  'title',
  'description',
  'thumbnail',
  'cost',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'category',
]) {
  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;

  @ApiProperty({
    description: '인기 태그',
    type: AssetTagRelation,
    isArray: true,
  })
  @IsNotEmpty()
  popularTags?: AssetTagRelation[];
}
