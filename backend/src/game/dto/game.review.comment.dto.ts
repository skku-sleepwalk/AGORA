import { PartialType, PickType } from '@nestjs/swagger';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';

export class GameReviewCommentDto extends PickType(
  PartialType(GameReviewComment),
  [
    'id',
    'content',
    'createdAt',
    'likeCount',
    'unlikeCount',
    'likeRelations',
    'author',
  ],
) {}
