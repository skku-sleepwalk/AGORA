import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryTypeDto } from './dto/create-categoryTypes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryType } from './entities/category.entity';
import { CategoryTypeRepository } from './category.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryType)
    private readonly categoryTypeRepository: CategoryTypeRepository,
  ) {}

  async createType(createCategoryTypeDto: CreateCategoryTypeDto) {
    const { name } = createCategoryTypeDto;
    if ((await this.findByName(name)) != undefined) {
      const error = { name: 'name is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuid();
    return this.categoryTypeRepository.save({ id, name });
  }

  findAll() {
    return this.categoryTypeRepository.find();
  }

  async findById(id: string) {
    const ret: CategoryType = await this.categoryTypeRepository.findOne(id);
    return ret;
  }

  async findByName(name: string) {
    return await this.categoryTypeRepository.findOne({ name: name });
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
