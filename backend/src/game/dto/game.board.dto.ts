import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameBoard } from 'src/entites/game.board.entity';

export class GameBoardDto extends PickType(GameBoard, [
  'id',
  'title',
  'content',
  'createdAt',
]) {
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  @IsNotEmpty()
  @ValidateNested()
  author: UserDto;

  @ApiProperty({ description: '댓글 수', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  childCount?: number;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 관계', type: () => Array<UserDto> })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;
}
