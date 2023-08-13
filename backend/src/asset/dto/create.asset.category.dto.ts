import { PickType } from '@nestjs/swagger';
import { AssetCategory } from 'src/entites/asset/asset.category.entity';

export class CreateAssetCategoryDto extends PickType(AssetCategory, ['name']) {}
