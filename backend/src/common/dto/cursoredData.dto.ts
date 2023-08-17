import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { AssetDto } from 'src/asset/dto/asset.dto';
import { AssetReviewCommentDto } from 'src/asset/dto/asset.review.comment.dto';
import { AssetReviewDto } from 'src/asset/dto/asset.review.dto';
import { CommunityBoardDto } from 'src/community/dto/community.board.dto';
import { BestBoardDto } from 'src/game/dto/best-board.dto';
import { GameBoardDto } from 'src/game/dto/game.board.dto';
import { GameDto } from 'src/game/dto/game.dto';
import { GameReviewCommentDto } from 'src/game/dto/game.review.comment.dto';
import { GameReviewDto } from 'src/game/dto/game.review.dto';
import { UserProfileUploadedAssetDto } from 'src/user/dto/user.profile.uploaded-asset.dto';
import { UserProfileUploadedGameDto } from 'src/user/dto/user.profile.uploaded-game.dto';
import { UserProfileWrittenCommunityBoardDto } from 'src/user/dto/user.profile.written-community-board.dto';
import { UserProfileWrittenGameBoardDto } from 'src/user/dto/user.profile.written-game-board.dto';

class Cursor {
  @ApiProperty({ description: '이전 페이지 커서' })
  @IsNotEmpty()
  beforeCursor: string | null;
  @ApiProperty({ description: '다음 페이지 커서' })
  @IsNotEmpty()
  afterCursor: string | null;
}

export class CursoredGameDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(GameDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<GameDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredGameReviewDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(GameReviewDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<GameReviewDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredGameReviewCommentDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(GameReviewCommentDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<GameReviewCommentDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredGameBoardDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(GameBoardDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<GameBoardDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredBestGameBoardDto {
  @ApiProperty({
    type: BestBoardDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<GameBoardDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredCommunityBoardDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(CommunityBoardDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<CommunityBoardDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredAssetDto {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(AssetDto),
    },
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<AssetDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredAssetReviewDto {
  @ApiProperty({
    isArray: true,
    type: AssetReviewDto,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<AssetReviewDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredAssetReviewCommentDto {
  @ApiProperty({
    isArray: true,
    type: AssetReviewCommentDto,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<AssetReviewCommentDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredUserProfileUploadedGameDto {
  @ApiProperty({
    type: UserProfileUploadedGameDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<UserProfileUploadedGameDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredUserProfileUploadedAsssetDto {
  @ApiProperty({
    type: UserProfileUploadedAssetDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<UserProfileUploadedAssetDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredUserProfileWrittenGameBoardDto {
  @ApiProperty({
    type: UserProfileWrittenGameBoardDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<UserProfileWrittenGameBoardDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}

export class CursoredUserProfileWrittenCommunityBoardDto {
  @ApiProperty({
    type: UserProfileWrittenCommunityBoardDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  data: Array<UserProfileWrittenCommunityBoardDto>;

  @ApiProperty({ type: Cursor })
  @IsNotEmpty()
  @ValidateNested()
  cursor: Cursor;
}
