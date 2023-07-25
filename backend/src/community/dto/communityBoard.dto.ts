import { PickType } from '@nestjs/swagger';
import { CommunityBoard } from 'src/entites/community.board.entity';

export class CommunityBoardDto extends PickType(CommunityBoard, [
  'title',
  'parent',
  'content',
  'likeCount',
  'childCount',
  'categories',
  'createdAt',
  'likeRelations',
]) {}
