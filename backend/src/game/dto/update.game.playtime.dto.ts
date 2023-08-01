import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGamePlaytimeDto {
  @ApiProperty({ description: '추가할 시간 (분단위)' })
  @IsNotEmpty()
  @IsNumber()
  readonly additionalPlaytime: number;
}
