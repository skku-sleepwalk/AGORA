import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CommunityCategoryService } from '../services/community.category.service';
import { CreateCommunityCategoryDto } from '../dto/create.community.category.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Community')
@Controller('community/category')
export class CommunityCategoryController {
  constructor(private communityCategoryService: CommunityCategoryService) {}

  @ApiOperation({ summary: '커뮤니티 카테고리 생성' })
  @Post()
  postCommunityCategory(@Body() data: CreateCommunityCategoryDto) {
    return this.communityCategoryService.postCommunityBoardCategory(data.name);
  }
}
