import { PickType } from '@nestjs/swagger';
import { User } from 'src/entites/user.entity';

export class UserDto extends PickType(User, [
  'email',
  'createdAt',
  'id',
  'name',
  'rating',
  'token',
  'description',
  'totalPlaytime',
]) {}
