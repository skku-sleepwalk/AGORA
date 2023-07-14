import { Module } from '@nestjs/common';
import { CategoryService } from './developer-community-category.service';
import { CategoryController } from './developer-community-category.controller';
import { CategoryTypeRepository } from './developer-community-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from './entities/developer-community-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryTypeRepository],
  exports: [CategoryService, TypeOrmModule],
})
export class CategoryModule {}
