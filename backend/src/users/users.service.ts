import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository';
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
    const { username, email } = createUserDto;
    const getByUserName = getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    const byUserName = await getByUserName.getOne();
    if (byUserName) {
      const error = { username: 'UserName is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const getByEmail = getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const byEmail = await getByEmail.getOne();
    if (byEmail) {
      const error = { email: 'email is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      id: uuid(),
      username: username,
      email: email,
      token: 0,
      rating: 0,
      createdAt: new Date(),
    };

    const validation_error = await validate(newUser);
    if (validation_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
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
    const toUpdateUser = await this.userRepository.findOne(id);
    const { username, email } = updateUserDto;
    toUpdateUser.email = email;
    toUpdateUser.username = username;
    return await this.userRepository.save(toUpdateUser);
  }
  async remove(userid: string) {
    await this.userRepository.delete({ id: userid });
  }
}
