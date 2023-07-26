import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateGameTagRelationDto {
  @ApiProperty({ description: '태그 이름들', example: ['스산한', '아름다운'] })
  @IsNotEmpty()
  @IsArray()
  tagNames: Array<string>;
}
