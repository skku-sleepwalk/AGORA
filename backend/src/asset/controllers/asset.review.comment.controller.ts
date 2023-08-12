import { Body, Controller, Post } from '@nestjs/common';
import { AssetReviewCommentService } from '../services/asset.review.comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { CreateGameReviewCommentDto } from 'src/game/dto/create.game.review.comment.dto';

@ApiTags('AssetReviewComment')
@Controller('asset/:assetId/review/:reviewId/comment')
export class AssetReviewCommentController {
  constructor(
    private readonly assetReviewCommentService: AssetReviewCommentService,
  ) {}

  @ApiOperation({ summary: '에셋 리뷰 댓글 작성' })
  @Post()
  createAssetReviewComment(
    @UserEmail() userEmail: string,
    @UuidParam('assetId') assetId: string,
    @UuidParam('reviewId') reviewId: string,
    @Body() data: CreateGameReviewCommentDto,
  ) {
    return this.assetReviewCommentService.createAssetReviewComment(
      userEmail,
      assetId,
      reviewId,
      data.content,
    );
  }
}
