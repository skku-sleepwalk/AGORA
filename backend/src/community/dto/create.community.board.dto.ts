import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommunityBoard } from 'src/entites/community.board.entity';

export class CreateCommunityBoardDto extends PickType(CommunityBoard, [
  'title',
  'content',
]) {
  @ApiProperty({ description: '부모 게시글 id' })
  @IsOptional()
  @IsString()
  parentId: string;

  @ApiProperty({ description: '카테고리 이름들' })
  @IsNotEmpty()
  @IsArray()
  categoryNames: Array<string>;
}
