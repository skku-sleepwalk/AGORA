import { ApiProperty, PickType } from '@nestjs/swagger';
import { GameBoard } from 'src/entites/game/game.board.entity';

export class UserProfileWrittenGameBoardDto extends PickType(GameBoard, [
  'id',
  'title',
  'createdAt',
  'updatedAt',
]) {
  @ApiProperty({ description: '좋아요 수' })
  likeCount: number;

  @ApiProperty({ description: '댓글 수' })
  commentCount: number;

  @ApiProperty({ description: '조회 수' })
  viewCount: number;
}
