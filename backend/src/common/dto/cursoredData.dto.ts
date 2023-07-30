import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CommunityBoardDto } from 'src/community/dto/community.board.dto';
import { GameBoardDto } from 'src/game/dto/game.board.dto';
import { GameDto } from 'src/game/dto/game.dto';
import { GameReviewCommentDto } from 'src/game/dto/game.review.comment.dto';
import { GameReviewDto } from 'src/game/dto/game.review.dto';

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
