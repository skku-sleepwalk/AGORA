import { ApiProperty, PickType } from '@nestjs/swagger';
import { Asset } from 'src/entites/asset/asset.entity';

export class UserProfileAssetDto extends PickType(Asset, [
  'id',
  'thumbnail',
  'title',
  'description',
]) {
  @ApiProperty({ description: '다운로드 수' })
  readonly downloadCount: number;
}
