import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSubscribeDto {
  @ApiProperty({ description: '남은 플레이 시간', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  remainPlayTime: number;

  @ApiProperty({ description: '구독 기간(날짜)', example: 30 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
