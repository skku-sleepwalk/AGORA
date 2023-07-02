import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryTypeRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryTypeRepository],
  exports: [CategoryService, TypeOrmModule],
})
export class CategoryModule {}
