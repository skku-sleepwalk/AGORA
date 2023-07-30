import { PickType } from '@nestjs/swagger';
import { User } from 'src/entites/user.entity';

export class UserDto extends PickType(User, [
  'id',
  'name',
  'email',
  'description',
  'token',
  'rating',
  'totalPlaytime',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
