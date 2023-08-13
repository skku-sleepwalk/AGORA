import { Controller, Delete, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetLikeService } from '../services/asset.like.service';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@ApiTags('Asset')
@Controller('asset/:assetId/like')
export class AssetLikeController {
  constructor(private assetLikeService: AssetLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Post()
  postAssetLike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetLikeService.createAssetLike(userEmail, assetId);
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Delete()
  deleteAssetLike(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetLikeService.deleteAssetLike(userEmail, assetId);
  }
}
