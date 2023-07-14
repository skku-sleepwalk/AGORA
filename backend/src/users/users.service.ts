import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { validate } from 'class-validator';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';

@Injectable()
export class UsersService {
  private readonly userRepository: UserRepository;
  constructor(private readonly connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const { name, description, email } = createUserDto;
    // 중복방지
    const byUserEmail = await this.userRepository.findOne({ email: email });
    if (byUserEmail != undefined) {
      const error = { userid: 'User Email is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = this.userRepository.create({
      id: uuid(),
      name,
      email,
      description,
    });
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

  async findById(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email: email });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const toUpdateUser = await this.userRepository.findOne(id);
    const { name, email } = updateUserDto;
    const createdAt = cloneDeep(toUpdateUser.createdAt);

    toUpdateUser.email = email;
    toUpdateUser.name = name;
    toUpdateUser.createdAt = createdAt;
    return await this.userRepository.save(toUpdateUser);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
