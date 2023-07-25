import { PartialType, PickType } from '@nestjs/swagger';
import { GameCost } from 'src/entites/game.cost.entity';

export class GameCostDto extends PickType(PartialType(GameCost), [
  'id',
  'isFree',
  'defaultPrice',
  'isSale',
  'saleEndAt',
  'salePercentage',
  'saleStartAt',
  'saledPrice',
]) {}
