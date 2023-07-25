import { PickType } from '@nestjs/swagger';
import { User } from 'src/entites/user.entity';

export class CreateUsersDto extends PickType(User, [
  'email',
  'name',
  'description',
  'password',
]) {}
