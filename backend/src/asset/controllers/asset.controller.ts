import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssetService } from '../services/asset.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { CreateAssetDto } from '../dto/create.asset.dto';
import { AssetDto } from '../dto/asset.dto';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { AssetSearchDto } from '../dto/asset.search.dto';
import { UpdateAssetDto } from '../dto/update.asset.dto';
import { CursoredAssetDto } from 'src/common/dto/cursoredData.dto';
import path, { join } from 'path';

import { createReadStream, createWriteStream } from 'fs';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOperation({ summary: 'Asset 생성' })
  @Post()
  PostAsset(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    @Body() data: CreateAssetDto,
  ) {
    return this.assetService.createAsset(
      userEmail,
      data.title,
      data.thumbnail,
      data.description,
      data.fileUrl,
      data.cost,
      data.category,
      data.isSensitive,
    );
  }

  @ApiOperation({ summary: 'Asset 카테고리별 조회' })
  @ApiResponse({ type: CursoredAssetDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @ApiQuery({ name: 'categoryNames', description: '카테고리 이름들' })
  @Get()
  GetAssetByCategory(
    @UserEmail() userEmail: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    return this.assetService.getAssets(
      userEmail,
      { afterCursor, beforeCursor },
      categoryNames,
    );
  }

  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiOperation({ summary: 'Asset 검색' })
  @ApiResponse({ type: CursoredAssetDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiQuery({ name: 'q', description: '검색 키워드' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @ApiQuery({ name: 'category', description: '카테고리' })
  @Get('search')
  PostAssetSearch(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
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
  @ApiOperation({ summary: 'Asset 하나 가져오기' })
  @ApiResponse({ type: AssetDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Get(':assetId')
  GetAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetService.getAsset(userEmail, assetId);
  }

  @ApiOperation({ summary: 'Asset 구매' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Post(':assetId/buy')
  BuyAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetService.buyAsset(userEmail, assetId);
  }

  @ApiOperation({ summary: 'Asset 다운로드' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Get(':assetId/download')
  async DownloadAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @Res() res,
  ) {
    const asset = await this.assetService.downloadAsset(userEmail, assetId);
    try {
      const response = await axios.get(asset.fileUrl, {
        responseType: 'arraybuffer',
      });

      const fileName = encodeURIComponent(
        `${asset.title}.${asset.fileUrl.split('.').pop()}`,
      );

      const contentDisposition = `attachment; filename="${fileName}"`;
      res.setHeader('Content-Disposition', contentDisposition);
      res.setHeader('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error) {
      throw new InternalServerErrorException(
        '파일을 다운로드하는데 실패했습니다.',
      );
    }
  }

  @ApiOperation({ summary: 'Asset 검색기록 가져오기(5개)' })
  @ApiResponse({ type: AssetSearchDto, isArray: true })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Get('search/history')
  GetAssetSearchHistory(@UserEmail() userEmail: string) {
    return this.assetService.getAssetSearchHistory(userEmail);
  }

  @ApiOperation({ summary: 'Asset 검색기록 키워드별 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'keyword', description: '검색 키워드' })
  @Delete('search/history/:keyword')
  DeleteAssetSearchHistory(
    @UserEmail() userEmail: string,
    @Param('keyword') keyword: string,
  ) {
    console.log(userEmail, keyword);
    return this.assetService.deleteAssetSearchHistory(userEmail, keyword);
  }

  @ApiOperation({ summary: 'Asset 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Patch(':assetId')
  PatchAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @Body() data: UpdateAssetDto,
  ) {
    return this.assetService.updateAsset(
      userEmail,
      assetId,
      data.title,
      data.thumbnail,
      data.description,
      data.fileUrl,
      data.cost,
      data.category,
      data.isSensitive,
    );
  }

  @ApiOperation({ summary: 'Asset 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Delete(':assetId')
  DeleteAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetService.deleteAsset(userEmail, assetId);
  }
}
