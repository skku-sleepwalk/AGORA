import { PartialType, PickType } from '@nestjs/swagger';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';

export class UpdateGameReviewCommentDto extends PickType(
  PartialType(GameReviewComment),
  ['content'],
) {}
