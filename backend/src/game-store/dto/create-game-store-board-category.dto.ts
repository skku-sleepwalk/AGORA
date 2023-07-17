import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreBoardCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
