import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameReview } from 'src/entites/game.review.entity';

export class GameReviewDto extends PickType(GameReview, [
  'id',
  'content',
  'createdAt',
  'rating',
  'likeCount',
  'unlikeCount',
]) {
  @IsNotEmpty()
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  author: UserDto;
}
