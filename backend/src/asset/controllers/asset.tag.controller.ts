import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AssetTagService } from '../services/asset.tag.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAssetTagDto } from '../dto/asset.tag.dto';

@ApiTags('AssetTag')
@Controller('asset/tag')
export class AssetTagController {
  constructor(private readonly assetTagService: AssetTagService) {}

  @ApiOperation({ summary: '태그 생성' })
  @Post()
  createAssetTag(@Body() data: CreateAssetTagDto) {
    return this.assetTagService.createAssetTag(data.name);
  }

  @ApiOperation({ summary: '태그 목록 조회' })
  @Get('list')
  getAssetTags() {
    return this.assetTagService.getAssetTagList();
  }

  @ApiOperation({ summary: '태그 검색' })
  @ApiQuery({ name: 'q', description: '검색 키워드' })
  @Get('search')
  searchAssetTag(@Query('q') keyword: string) {
    return this.assetTagService.searchAssetTag(keyword);
  }
}
