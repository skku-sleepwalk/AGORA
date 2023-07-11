import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import { CreateAssetStoreBoardsDto } from './dto/create-asset-store.dto';
import { UpdateAssetStoreDto } from './dto/update-asset-store.dto';

@Controller('asset-store')
export class AssetStoreController {
  constructor(private readonly assetStoreService: AssetStoreService) {}

  @Post('/boards')
  create(@Body() createAssetStoreBoardsDto: CreateAssetStoreBoardsDto) {
    return this.assetStoreService.createAssetStoreBoards(
      createAssetStoreBoardsDto,
    );
  }

  @Get()
  findAll() {
    return this.assetStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetStoreService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetStoreDto: UpdateAssetStoreDto,
  ) {
    return this.assetStoreService.update(+id, updateAssetStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetStoreService.remove(+id);
  }
}
