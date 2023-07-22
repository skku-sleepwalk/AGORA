import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaytimeRelationDto {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;
}
