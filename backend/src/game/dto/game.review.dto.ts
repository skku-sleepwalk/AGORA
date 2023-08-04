import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameReview } from 'src/entites/game/game.review.entity';

export class GameReviewDto extends PickType(GameReview, [
  'id',
  'content',
  'createdAt',
  'deletedAt',
  'updatedAt',
  'rating',
]) {
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
