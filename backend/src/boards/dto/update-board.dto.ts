import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsNotEmpty()
  @IsString()
  readonly updateEmail: string;

  @IsOptional()
  @IsString()
  readonly updatedTitle: string;

  @IsOptional()
  @IsString()
  readonly updatedContent: string;
}
