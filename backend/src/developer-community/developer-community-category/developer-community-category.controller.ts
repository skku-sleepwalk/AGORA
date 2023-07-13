import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './developer-community-category.service';
import { CreateCategoryTypeDto } from './dto/create-categoryTypes.dto';

@Controller('developer-community-category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryTypeDto: CreateCategoryTypeDto) {
    return this.categoryService.createType(createCategoryTypeDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/id')
  findById(@Query('data') data: string) {
    return this.categoryService.findById(data);
  }
  @Get('/name')
  findByName(@Query('data') data: string) {
    return this.categoryService.findByName(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
