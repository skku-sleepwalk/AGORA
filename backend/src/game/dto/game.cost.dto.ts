import { PickType } from '@nestjs/swagger';
import { GameCost } from 'src/entites/game/game.cost.entity';

export class GameCostDto extends PickType(GameCost, [
  'id',
  'isFree',
  'defaultPrice',
  'isSale',
  'saleEndAt',
  'salePercentage',
  'saleStartAt',
  'saledPrice',
]) {}
