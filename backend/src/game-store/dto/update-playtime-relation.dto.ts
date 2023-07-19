import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePlaytimeRelationDto {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;

  @IsNotEmpty()
  @IsNumber()
  additionalPlayTime: number;
}
