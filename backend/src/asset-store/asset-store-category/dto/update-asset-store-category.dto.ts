import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetStoreCategoryDto } from './create-asset-store-category.dto';

export class UpdateAssetStoreCategoryDto extends PartialType(
  CreateAssetStoreCategoryDto,
) {}
