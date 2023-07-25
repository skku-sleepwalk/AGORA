import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameBoard } from 'src/entites/game.board.entity';

export class GameBoardDto extends PickType(PartialType(GameBoard), [
  'id',
  'title',
  'content',
  'childCount',
  'likeCount',
  'createdAt',
]) {
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  @IsNotEmpty()
  @ValidateNested()
  author: UserDto;

  @ApiProperty({ description: '좋아요 관계', type: () => Array<UserDto> })
  @IsNotEmpty()
  @ValidateNested()
  likeRelations: Array<UserDto>;
}
