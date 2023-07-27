import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';

export class GameReviewCommentDto extends PickType(
  PartialType(GameReviewComment),
  ['id', 'content', 'createdAt'],
) {
  @IsNotEmpty()
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  author: UserDto;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  dislikeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;

  @ApiProperty({ description: '싫어요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  dislike?: boolean;
}
