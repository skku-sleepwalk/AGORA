import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityCategory } from 'src/entites/community.category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityCategoryService {
  constructor(
    @InjectRepository(CommunityCategory)
    private readonly communityCategoryRepository: Repository<CommunityCategory>,
  ) {}

  postCommunityBoardCategory(name: string) {
    this.communityCategoryRepository.save({ name });
    return;
  }
}
