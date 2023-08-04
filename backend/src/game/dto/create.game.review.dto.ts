import { PickType } from '@nestjs/swagger';
import { GameReview } from 'src/entites/game/game.review.entity';

export class CreateGameReviewDto extends PickType(GameReview, [
  'content',
  'rating',
]) {}
