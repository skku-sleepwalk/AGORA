import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetPurchaseService } from '../services/assset.purchase.service';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import axios from 'axios';

@ApiTags('AssetPurchase')
@Controller('asset:assetId/')
export class AssetPurchaseController {
  constructor(private readonly assetPurchaseService: AssetPurchaseService) {}

  @ApiOperation({ summary: '에셋 구매' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Post('/purchase')
  PostAssetPurchase(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetPurchaseService.buyAsset(userEmail, assetId);
  }

  @ApiOperation({ summary: 'Asset 다운로드' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: 'Asset 아이디' })
  @Get('/download')
  async DownloadAsset(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @Res() res,
  ) {
    const asset = await this.assetPurchaseService.downloadAsset(
      userEmail,
      assetId,
    );
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
}
