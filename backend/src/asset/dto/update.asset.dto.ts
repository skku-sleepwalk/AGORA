import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Asset } from 'src/entites/asset/asset.entity';

export class UpdateAssetDto extends PickType(Asset, [
  'title',
  'description',
  'downloadUrl',
  'cost',
  'thumbnail',
  'isSensitive',
]) {
  @ApiProperty({ description: '카테고리 이름', example: '3D' })
  @IsNotEmpty()
  @IsString()
  category: string;
}
