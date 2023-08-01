import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
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
  @ApiProperty({ description: '총 플레이 시간' })
  @IsNotEmpty()
  @IsNumber()
  totalPlaytime: number;
}
