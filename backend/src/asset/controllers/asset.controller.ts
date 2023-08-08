import { Body, Controller, Headers, Post } from '@nestjs/common';
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
}
