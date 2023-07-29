import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityCategory } from 'src/entites/community.category.entity';

export class CommunityBoardDto extends PickType(CommunityBoard, [
  'id',
  'title',
  'content',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @IsNotEmpty()
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  author: UserDto;

  @IsOptional()
  @ApiProperty({
    description: '부모 게시글 정보',
    type: () => CommunityBoardDto,
  })
  parent: CommunityBoardDto;

  @IsNotEmpty()
  @ApiProperty({ description: '카테고리 정보', type: () => CommunityCategory })
  categories: Array<CommunityCategory>;

  @ApiProperty({ description: '댓글 수', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  childCount?: number;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;
}
