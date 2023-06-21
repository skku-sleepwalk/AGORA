import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { v1 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id, username, email } = createUserDto;
    // 중복방지
    const byUserId = await this.userRepository.findOne(id);
    if (byUserId != undefined) {
      const error = { userid: 'Userid is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const byEmail = await this.userRepository.findOne(email);
    if (byEmail != undefined) {
      const error = { email: 'email is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      id,
      username,
      email,
      token: 0,
      rating: 0,
      createdAt: new Date(),
    };

    const validation_error = await validate(newUser);
    if (validation_error.length > 0) {
      const _error = { userid: 'UserInput is not valid check type' };
      throw new HttpException(
        { message: 'Input data validation failed', _error },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.userRepository.save(newUser);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const toUpdateUser = await this.findOne(id);
    const { username, email } = updateUserDto;
    toUpdateUser.email = email;
    toUpdateUser.username = username;
    toUpdateUser.updatedAt = new Date();
    return await this.userRepository.save(toUpdateUser);
  }
  async remove(userid: string) {
    await this.userRepository.delete({ id: userid });
  }
}
