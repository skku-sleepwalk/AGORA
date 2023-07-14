import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
