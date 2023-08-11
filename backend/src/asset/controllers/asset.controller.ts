import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssetService } from '../services/asset.service';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOperation({ summary: 'Asset 생성' })
  @Post()
  PostAsset(@Headers('Authorization') userEmail: string, @Body() data) {
    this.assetService.createAsset(
      userEmail,
      data.title,
      data.description,
      data.downloadUrl,
      data.cost,
    );
  }

  @ApiOperation({ summary: 'Asset 검색' })
  @Get('search')
  PostAssetSearch(
    @Headers('Authorization') userEmail: string,
    @Query('q') keyword: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('category') category: string,
  ) {
    return this.assetService.searchAsset(
      userEmail,
      keyword,
      { afterCursor, beforeCursor },
      category,
    );
  }
}
