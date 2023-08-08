import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSubscribeDto {
  @ApiProperty({ description: '남은 플레이 시간', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  remainPlayTime: number;
}
