import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GameCost } from 'src/entites/game.cost.entity';
import { GameStore } from 'src/entites/game.store.entity';

export class CreateGameStoreDto extends PickType(GameStore, [
  'title',
  'cost',
  'snsUrls',
  'developer',
  'distributor',
]) {
  @ApiProperty({
    description: '가격 상세',
    type: () =>
      PickType(GameCost, [
        'isFree',
        'defaultPrice',
        'isSale',
        'salePercentage',
        'saledPrice',
        'saleStartAt',
        'saleEndAt',
      ]),
  })
  @IsNotEmpty()
  @ValidateNested()
  cost: GameCost;
}
