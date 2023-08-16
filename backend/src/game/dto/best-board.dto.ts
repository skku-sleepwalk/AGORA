import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameBoard } from 'src/entites/game/game.board.entity';
import { GameBoardDto } from './game.board.dto';
import { GameBoardCategory } from 'src/entites/game/game.board.category.entity';
import { GameDto } from './game.dto';

export class BestBoardDto extends PickType(GameBoard, [
  'id',
  'title',
  'content',
  'createdAt',
  'deletedAt',
  'updatedAt',
]) {
  @ApiProperty({ description: '게임 정보', type: GameDto })
  @IsNotEmpty()
  @ValidateNested()
  game: GameDto;

  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  @IsNotEmpty()
  @ValidateNested()
  author: UserDto;

  @ApiProperty({ description: '부모 게시글 정보', type: () => GameBoardDto })
  @IsOptional()
  @ValidateNested()
  parent: GameBoardDto;

  @ApiProperty({
    description: '작성자 정보',
    type: GameBoardCategory,
    isArray: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  categories: Array<GameBoardCategory>;

  @ApiProperty({ description: '댓글 수', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  childCount?: number;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 ', type: Boolean, example: true })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;
}
