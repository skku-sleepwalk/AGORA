import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameReviewDto } from '../dto/create.game.review.dto';
import { GameReviewService } from '../services/game.review.service';
import { UpdateGameReviewDto } from '../dto/update.game.review.dto';
import { CursoredGameReviewDto } from 'src/common/dto/cursoredData.dto';
import { GameReviewDto } from '../dto/game.review.dto';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameReview')
@Controller('game/:gameId/review')
export class GameReviewController {
  constructor(private gameReviewService: GameReviewService) {}

  @ApiOperation({ summary: '리뷰 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @Post()
  PostGameReview(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @Body() data: CreateGameReviewDto,
  ) {
    return this.gameReviewService.postGameReview(
      userEmail,
      gameId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '게임에 해당하는 리뷰 가져오기' })
  @ApiResponse({ type: CursoredGameReviewDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiQuery({
    name: 'beforeCursor',
    description: '이전 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'afterCursor',
    description: '다음 페이지 커서(페이지네이션 옵션)',
  })
  @Get()
  GetManyGameReview(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    if (!gameId) throw new BadRequestException('gameId를 입력해주세요.');
    if (!userEmail) throw new BadRequestException('userEmail을 입력해주세요.');
    return this.gameReviewService.getManyGameReview(
      userEmail,
      { afterCursor, beforeCursor },
      gameId,
    );
  }

  @ApiOperation({ summary: '유져에 해당하는 리뷰 가져오기' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiResponse({ type: GameReviewDto })
  @Get('user')
  GetOneGameReviewByUser(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
  ) {
    return this.gameReviewService.getOneGameReviewByUser(userEmail, gameId);
  }

  @ApiOperation({ summary: '리뷰 하나 가져오기' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @ApiResponse({ type: GameReviewDto })
  @Get(':reviewId')
  GetOneGameReview(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
  ) {
    return this.gameReviewService.getOneGameReview(userEmail, gameId, reviewId);
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Patch(':reviewId')
  updateGameReview(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('reviewId') reviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('reviewId') reviewId: string,
    @Body() data: UpdateGameReviewDto,
  ) {
    return this.gameReviewService.updateGameReview(
      userEmail,
      gameId,
      reviewId,
      data.content,
      data.rating,
    );
  }

  @ApiOperation({ summary: '리뷰 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @ApiParam({ name: 'reviewId', description: '리뷰 아이디' })
  @Delete(':id')
  deleteGameReview(
    // @Headers('Authorization') userEmail: string,
    // @Param('gameId') gameId: string,
    // @Param('id') gameReviewId: string,
    @UserEmail() userEmail: string,
    @UuidParam('gameId') gameId: string,
    @UuidParam('id') gameReviewId: string,
  ) {
    return this.gameReviewService.deleteGameReview(
      userEmail,
      gameId,
      gameReviewId,
    );
  }
}
