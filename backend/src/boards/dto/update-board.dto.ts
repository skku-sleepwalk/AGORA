import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsNotEmpty()
  @IsString()
  readonly updateEmail: string;
}
