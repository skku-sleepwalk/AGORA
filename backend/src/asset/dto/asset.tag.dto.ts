import { PickType } from '@nestjs/swagger';
import { AssetTag } from 'src/entites/asset/asset.tag.entity';

export class CreateAssetTagDto extends PickType(AssetTag, ['name']) {}
