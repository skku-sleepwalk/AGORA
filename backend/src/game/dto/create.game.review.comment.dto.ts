import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';

export class CreateGameReviewCommentDto extends PickType(
  PartialType(GameReviewComment),
  ['content'],
) {
  @ApiProperty({ description: '리뷰 아이디' })
  @IsNotEmpty()
  @IsString()
  reviewId: string;
}
