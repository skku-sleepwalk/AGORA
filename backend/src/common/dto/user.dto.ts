import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/entites/user.entity';
import { PlaytimesDto } from './playtimes.dto';

export class UserDto extends PickType(User, [
  'id',
  'name',
  'email',
  'description',
  'token',
  'rating',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({
    description: '총 플레이 시간(유저 하나 불러오거나, 여러개 불러올 때만)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalPlaytime?: number;

  @ApiProperty({
    description: '플레이 시간(리뷰 불러올때만)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  playtime?: number;

  @ApiProperty({
    description: '전체 게임 별 플레이 시간',
    type: () => PlaytimesDto,
    isArray: true,
  })
  playtimes?: PlaytimesDto[];

  @ApiProperty({ description: '잔여 플레이 시간' })
  @IsNumber()
  remainPlaytime?: number;
}
