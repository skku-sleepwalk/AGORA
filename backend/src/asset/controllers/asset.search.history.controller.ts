import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetSearchHistoryService } from '../services/asset.search.history.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';

@ApiTags('Asset')
@Controller('asset/searchHistory')
export class AssetSearchHistoryController {
  constructor(
    private readonly assetSearchHistoryService: AssetSearchHistoryService,
  ) {}

  @ApiOperation({ summary: '검색 기록 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'keyword', description: '검색 키워드' })
  @Post()
  PostAssetSearchHistory(
    @UserEmail() userEmail: string,
    @Param('keyword') keyword: string,
  ) {
    return this.assetSearchHistoryService.create(userEmail, keyword);
  }

  @ApiOperation({ summary: '검색 기록 조회' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'keyword', description: '검색 키워드' })
  @Get()
  GetAssetSearchHistory(@UserEmail() userEmail: string) {
    return this.assetSearchHistoryService.getHistory(userEmail);
  }

  @ApiOperation({ summary: '검색 기록 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'keyword', description: '검색 키워드' })
  @Delete(':keyword')
  DeleteAssetSearchHistory(
    @UserEmail() userEmail: string,
    @Param('keyword') keyword: string,
  ) {
    return this.assetSearchHistoryService.delete(userEmail, keyword);
  }

  @ApiOperation({ summary: '검색 기록 전체 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteAllAssetSearchHistory(@UserEmail() userEmail: string) {
    return this.assetSearchHistoryService.deleteAll(userEmail);
  }
}
