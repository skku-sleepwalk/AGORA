import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { GameBoard } from 'src/entites/game.board.entity';

export class CreateGameBoardDto extends PickType(PartialType(GameBoard), [
  'title',
  'content',
]) {
  @ApiProperty({
    example: ['공략', '개발일정'],
    description: '카테고리 이름들',
  })
  @IsNotEmpty()
  @IsArray()
  categoryNames: Array<string>;

  @ApiProperty({
    description: '부모 게시글 아이디',
  })
  @IsNotEmpty()
  @IsString()
  parentId: string;
}
