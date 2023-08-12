import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AssetTagRelationService } from '../services/asset.tag.relation.service';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { CreateAssetTagRelationDto } from '../dto/create.asset.tag.relation.dto';

@ApiTags('AssetTag')
@Controller('asset/:assetId/tag')
export class AssetTagRelationController {
  constructor(
    private readonly assetTagRelationService: AssetTagRelationService,
  ) {}

  @ApiOperation({ summary: '태그 관계 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Post()
  createAssetTagRelation(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @Body() data: CreateAssetTagRelationDto,
  ) {
    return this.assetTagRelationService.createAssetTagRelation(
      userEmail,
      assetId,
      data.tagName,
    );
  }

  @ApiOperation({ summary: '태그 관계 조회' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Get()
  getAssetTagRelations(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
  ) {
    return this.assetTagRelationService.getAssetTagRelations(
      userEmail,
      assetId,
    );
  }

  @ApiOperation({ summary: '태그 관계 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Delete(':relationId')
  deleteAssetTagRelation(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('relationId') relationId: string,
  ) {
    return this.assetTagRelationService.deleteAssetTagRelation(
      userEmail,
      assetId,
      relationId,
    );
  }
}
