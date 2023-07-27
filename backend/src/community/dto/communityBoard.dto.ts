import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { CommunityBoard } from 'src/entites/community.board.entity';

export class CommunityBoardDto extends PickType(CommunityBoard, [
  'title',
  'parent',
  'content',
  'childCount',
  'categories',
  'createdAt',
]) {
  @IsNotEmpty()
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  author: UserDto;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;
}
