import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateCommunityBoardDto extends PickType(CommunityBoard, [
  'title',
  'content',
]) {
  @ApiProperty({ description: '카테고리 이름들', example: ['Unity', 'C'] })
  @IsNotEmpty()
  @IsArray()
  categoryNames: Array<string>;
}
