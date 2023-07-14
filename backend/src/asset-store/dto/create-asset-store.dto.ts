import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssetStoreBoardsDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly authorEmail: string;

  @IsNotEmpty()
  @IsString()
  readonly downloadUrl: string[];

  @IsNotEmpty()
  @IsArray()
  readonly categoryNames: Array<string>;
}

export class CreateAssetStoreReviewsDto {
  @IsNotEmpty()
  @IsString()
  readonly writerEmail: string;

  @IsNotEmpty()
  @IsString()
  readonly assetStoreBoardId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
