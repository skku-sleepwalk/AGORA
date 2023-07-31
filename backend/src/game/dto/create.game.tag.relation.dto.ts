import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameTagRelationsDto {
  @ApiProperty({
    description: '태그 이름',
  })
  @IsNotEmpty()
  @IsString()
  tagName: string;
}
