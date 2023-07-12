import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetStoreCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
