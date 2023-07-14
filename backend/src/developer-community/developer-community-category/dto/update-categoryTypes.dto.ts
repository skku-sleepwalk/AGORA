import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryTypeDto } from './create-categoryTypes.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryTypeDto extends PartialType(CreateCategoryTypeDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
