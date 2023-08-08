import { PickType } from '@nestjs/swagger';
import { User } from 'src/entites/user.entity';

export class LoginUserDto extends PickType(User, ['email', 'password']) {}
