import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryTypeDto } from './dto/create-categoryTypes.dto';
import { UpdateCategoryTypeDto } from './dto/update-categoryTypes.dto';

@Controller('category')
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

  @Get('/')
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
