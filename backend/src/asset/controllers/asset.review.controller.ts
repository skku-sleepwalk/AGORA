import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssetReviewService } from '../services/asset.review.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { CreateAssetReviewDto } from '../dto/create.asset.review.dto';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { CursoredAssetReviewDto } from 'src/common/dto/cursoredData.dto';
import { UpdateAssetReviewDto } from '../dto/update.asset.review.dto';
import { AssetReviewDto } from '../dto/asset.review.dto';

@ApiTags('AssetReview')
@Controller('asset/:assetId/review')
export class AssetReviewController {
  constructor(private readonly assetReviewService: AssetReviewService) {}

  @ApiOperation({ summary: '에셋 리뷰 작성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Post()
  createAssetReview(
    @UserEmail() UserEmail: string,
    @UuidParam('assetId') assetId: string,
    @Body() data: CreateAssetReviewDto,
  ) {
    return this.assetReviewService.createAssetReview(
      UserEmail,
      assetId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 단일 조회' })
  @ApiResponse({ type: AssetReviewDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Get(':reviewId')
  getAssetReview(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewService.getAssetReview(userEmail, assetId, reviewId);
  }

  @ApiOperation({ summary: '에셋 리뷰 조회' })
  @ApiResponse({ type: CursoredAssetReviewDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Get()
  getAssetReviews(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.assetReviewService.getAssetReviews(userEmail, assetId, {
      afterCursor,
      beforeCursor,
    });
  }

  @ApiOperation({ summary: '에셋 리뷰 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Patch(':reviewId')
  updateAssetReview(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @Body() data: UpdateAssetReviewDto,
  ) {
    return this.assetReviewService.updateAssetReview(
      userEmail,
      assetId,
      reviewId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '에셋 리뷰 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'assetId', description: '에셋 아이디' })
  @Delete(':reviewId')
  deleteAssetReview(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.assetReviewService.deleteAssetReview(
      userEmail,
      assetId,
      reviewId,
    );
  }
}
