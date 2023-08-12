import { PickType } from '@nestjs/swagger';
import { AssetSearchHistory } from 'src/entites/asset/asset.search.history.entity';

export class AssetSearchDto extends PickType(AssetSearchHistory, [
  'id',
  'keyword',
]) {}
