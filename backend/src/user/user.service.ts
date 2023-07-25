import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async postUsers(
    email: string,
    name: string,
    password: string,
    description: string,
  ) {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(user);
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userRepository.save({
      email,
      name,
      password: hashedPassword,
      description,
    });
  }
}
