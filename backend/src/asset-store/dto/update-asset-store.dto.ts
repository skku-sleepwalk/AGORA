import { PartialType } from '@nestjs/swagger';
import { CreateAssetStoreBoardsDto } from './create-asset-store.dto';

export class UpdateAssetStoreDto extends PartialType(
  CreateAssetStoreBoardsDto,
) {}
