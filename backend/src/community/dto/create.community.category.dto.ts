import { PickType } from '@nestjs/swagger';
import { CommunityCategory } from 'src/entites/community/community.category.entity';

export class CreateCommunityCategoryDto extends PickType(CommunityCategory, [
  'name',
]) {}
