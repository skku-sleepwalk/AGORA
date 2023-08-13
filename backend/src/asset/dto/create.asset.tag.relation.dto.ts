import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetTagRelationDto {
  @ApiProperty({ description: '태그 이름', example: '3D' })
  @IsNotEmpty()
  @IsString()
  tagName: string;
}
