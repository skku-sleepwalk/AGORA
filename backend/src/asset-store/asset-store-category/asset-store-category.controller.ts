import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetStoreCategoryService } from './asset-store-category.service';
import { CreateAssetStoreCategoryDto } from './dto/create-asset-store-category.dto';
import { UpdateAssetStoreCategoryDto } from './dto/update-asset-store-category.dto';

@Controller('asset-store-category')
export class AssetStoreCategoryController {
  constructor(private readonly assetStoreCategoryService: AssetStoreCategoryService) {}

  @Post()
  create(@Body() createAssetStoreCategoryDto: CreateAssetStoreCategoryDto) {
    return this.assetStoreCategoryService.create(createAssetStoreCategoryDto);
  }

  @Get()
  findAll() {
    return this.assetStoreCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetStoreCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetStoreCategoryDto: UpdateAssetStoreCategoryDto) {
    return this.assetStoreCategoryService.update(+id, updateAssetStoreCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetStoreCategoryService.remove(+id);
  }
}
