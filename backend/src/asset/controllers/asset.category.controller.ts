import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { AssetCategoryService } from '../services/asset.category.service';
import { CreateAssetCategoryDto } from '../dto/create.asset.category.dto';

@ApiTags('Asset')
@Controller('asset/category')
@UseInterceptors(UndefinedToNullInterceptor)
export class AssetCategoryController {
  constructor(private readonly assetCategoryService: AssetCategoryService) {}

  @ApiOperation({ summary: '카테고리 생성' })
  @Post()
  postAssetCategory(@Body() body: CreateAssetCategoryDto) {
    return this.assetCategoryService.createAssetCategory(body.name);
  }
}
