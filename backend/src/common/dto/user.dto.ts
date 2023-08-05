import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Game } from 'src/entites/game/game.entity';
import { User } from 'src/entites/user.entity';

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
    description: '게임 별 플레이 시간(리뷰 불러올때만)',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  playtime?: Array<{ game: Game; playtime: number }>;
}
