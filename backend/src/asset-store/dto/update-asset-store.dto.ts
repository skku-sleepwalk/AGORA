import { PartialType } from '@nestjs/swagger';
import { CreateAssetStoreDto } from './create-asset-store.dto';

export class UpdateAssetStoreDto extends PartialType(CreateAssetStoreDto) {}
