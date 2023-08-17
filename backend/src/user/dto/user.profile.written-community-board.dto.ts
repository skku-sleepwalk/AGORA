import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommunityBoard } from 'src/entites/community/community.board.entity';

export class UserProfileWrittenCommunityBoardDto extends PickType(
  CommunityBoard,
  ['id', 'title', 'createdAt', 'updatedAt'],
) {
  @ApiProperty({ description: '좋아요 수' })
  likeCount: number;

  @ApiProperty({ description: '댓글 수' })
  commentCount: number;

  @ApiProperty({ description: '조회 수' })
  viewCount: number;
}
