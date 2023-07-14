import { EntityRepository, Repository } from 'typeorm';
import { CategoryType } from './entities/developer-community-category.entity';

@EntityRepository(CategoryType)
export class CategoryTypeRepository extends Repository<CategoryType> {}
