import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import {
  CreateAssetStoreBoardsDto,
  CreateAssetStoreReviewsDto,
} from './dto/create-asset-store.dto';
import { UpdateAssetStoreDto } from './dto/update-asset-store.dto';

@Controller('asset-store')
export class AssetStoreController {
  constructor(private readonly assetStoreService: AssetStoreService) {}

  @Post('/boards')
  createAssetStoreBoards(
    @Body() createAssetStoreBoardsDto: CreateAssetStoreBoardsDto,
  ) {
    return this.assetStoreService.createAssetStoreBoards(
      createAssetStoreBoardsDto,
    );
  }

  @Post('/reviews')
  createAssetStoreReviews(
    @Body() createAssetStoreReviewssDto: CreateAssetStoreReviewsDto,
  ) {
    return this.assetStoreService.createAssetStoreReviews(
      createAssetStoreReviewssDto,
    );
  }

  @Get()
  findAll(
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('order') order,
  ) {
    return this.assetStoreService.findAllAssetStoreBoards(
      { afterCursor, beforeCursor },
      order,
    );
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
