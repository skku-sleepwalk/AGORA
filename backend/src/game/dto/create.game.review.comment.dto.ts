import { PickType } from '@nestjs/swagger';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';

export class CreateGameReviewCommentDto extends PickType(GameReviewComment, [
  'content',
]) {}
