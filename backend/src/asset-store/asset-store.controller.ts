import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { AssetStoreService } from './asset-store.service';
import {
  CreateAssetStoreBoardsDto,
  CreateAssetStoreReviewsDto,
} from './dto/create-asset-store.dto';
import {
  UpdateAssetStoreBoardsDto,
  UpdateAssetStoreReviewsDto,
} from './dto/update-asset-store.dto';
import { AssetStoreBoardsOrder } from './entities/asset-store.entity';

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

  @Get('/main')
  findAllAssetStoreBoards(
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('order') order: AssetStoreBoardsOrder,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    return this.assetStoreService.findAllAssetStoreBoards(
      { afterCursor, beforeCursor },
      order,
      categoryNames,
    );
  }

  @Get('/search')
  searchAssetStoreBoards(
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('order') order: AssetStoreBoardsOrder,
    @Query('search') search: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: string[],
  ) {
    return this.assetStoreService.searchAssetStoreBoards(
      { afterCursor, beforeCursor },
      order,
      search,
      categoryNames,
    );
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.assetStoreService.findOne(id);
  }

  @Patch('/boards/:id')
  updateAssetStoreBoards(
    @Param('id') id: string,
    @Body() updateAssetStoreDto: UpdateAssetStoreBoardsDto,
  ) {
    return this.assetStoreService.updateAssetStoreBoards(
      id,
      updateAssetStoreDto,
    );
  }

  @Patch('/reviews/:id')
  updateAssetStoreReviews(
    @Param('id') id: string,
    @Body() updateAssetStoreDto: UpdateAssetStoreReviewsDto,
  ) {
    return this.assetStoreService.updateAssetStoreReviews(
      id,
      updateAssetStoreDto,
    );
  }

  @Delete('/boards/:id')
  removeAssetStoreBoards(@Param('id') id: string) {
    return this.assetStoreService.removeAssetStoreBoards(id);
  }

  @Delete('/reviews/:id')
  removeAssetStoreReviews(@Param('id') id: string) {
    return this.assetStoreService.removeAssetStoreBoards(id);
  }
}
