import { PartialType } from '@nestjs/swagger';
import {
  CreateAssetStoreBoardsDto,
  CreateAssetStoreReviewsDto,
} from './create-asset-store.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAssetStoreBoardsDto extends PartialType(
  CreateAssetStoreBoardsDto,
) {
  @IsNotEmpty()
  @IsString()
  readonly updateEmail: string;
}

export class UpdateAssetStoreReviewsDto extends PartialType(
  CreateAssetStoreReviewsDto,
) {
  @IsNotEmpty()
  @IsString()
  readonly updateEmail: string;
}
