import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserProfileService } from '../services/user.profile.service';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import {
  CursoredUserProfileUploadedAsssetDto,
  CursoredUserProfileUploadedGameDto,
  CursoredUserProfileWrittenCommunityBoardDto,
  CursoredUserProfileWrittenGameBoardDto,
} from 'src/common/dto/cursoredData.dto';

@ApiTags('UserProfile')
@Controller('users/:userId/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiOperation({ summary: '업로드한 게임 조회' })
  @ApiResponse({ type: CursoredUserProfileUploadedGameDto })
  @ApiParam({ name: 'userId', description: '유저 아이디' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @Get('uploaded-game')
  GetGameByUser(
    @UuidParam('userId') userId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.userProfileService.getGameByUser(userId, {
      afterCursor,
      beforeCursor,
    });
  }

  @ApiOperation({ summary: '업로드한 에셋 조회' })
  @ApiResponse({ type: CursoredUserProfileUploadedAsssetDto })
  @ApiParam({ name: 'userId', description: '유저 아이디' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @Get('uploaded-asset')
  GetAssetByUser(
    @UuidParam('userId') userId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.userProfileService.getAssetByUser(userId, {
      afterCursor,
      beforeCursor,
    });
  }

  @ApiOperation({ summary: '작성한 커뮤니티 게시글 조회' })
  @ApiResponse({ type: CursoredUserProfileWrittenCommunityBoardDto })
  @ApiParam({ name: 'userId', description: '유저 아이디' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @Get('written-community-board')
  GetCommunityBoardByUser(
    @UuidParam('userId') userId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.userProfileService.getCommunityBoardByUser(userId, {
      afterCursor,
      beforeCursor,
    });
  }

  @ApiOperation({ summary: '작성한 게임 게시글 조회' })
  @ApiResponse({ type: CursoredUserProfileWrittenGameBoardDto })
  @ApiParam({ name: 'userId', description: '유저 아이디' })
  @ApiQuery({ name: 'afterCursor', description: '이후 커서' })
  @ApiQuery({ name: 'beforeCursor', description: '이전 커서' })
  @Get('written-game-board')
  GetGameBoardByUser(
    @UuidParam('userId') userId: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.userProfileService.getGameBoardByUser(userId, {
      afterCursor,
      beforeCursor,
    });
  }

  @ApiOperation({ summary: '다운로드 한 에셋 조회' })
  @ApiParam({ name: 'userId', description: '유저 아이디' })
  @Get('downloaded-asset')
  GetDownloadedAsset(@UuidParam('userId') userId: string) {
    return this.userProfileService.getDownloadedAsset(userId);
  }
}
