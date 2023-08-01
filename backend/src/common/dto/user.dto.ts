import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
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
  })
  @IsOptional()
  @IsNumber()
  totalPlaytime?: number;
}
