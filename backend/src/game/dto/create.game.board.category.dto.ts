import { PickType } from '@nestjs/swagger';
import { GameBoardCategory } from 'src/entites/game/game.board.category.entity';

export class CreateGameBoardCategoryDto extends PickType(GameBoardCategory, [
  'name',
]) {}
