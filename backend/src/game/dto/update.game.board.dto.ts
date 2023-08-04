import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { GameBoard } from 'src/entites/game/game.board.entity';

export class UpdateGameBoardDto extends PickType(PartialType(GameBoard), [
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
}
