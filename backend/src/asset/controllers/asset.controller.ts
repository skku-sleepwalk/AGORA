import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
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
import { UpdateAssetDto } from '../dto/update.asset.dto';
import { CursoredAssetDto } from 'src/common/dto/cursoredData.dto';

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

  @ApiOperation({ summary: 'Asset 검색' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiResponse({ type: CursoredAssetDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiQuery({ name: 'q', description: '검색 키워드' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @ApiQuery({ name: 'categoryNames', description: '카테고리 이름들' })
  @Get('search')
  PostAssetSearch(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    @Query('q') keyword: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    return this.assetService.searchAsset(
      userEmail,
      keyword,
      { afterCursor, beforeCursor },
      categoryNames,
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
