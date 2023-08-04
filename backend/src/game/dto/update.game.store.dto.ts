import { PartialType, PickType } from '@nestjs/swagger';
import { GameStore } from 'src/entites/game.store.entity';

export class UpdateGameStoreDto extends PickType(PartialType(GameStore), [
  'title',
  'developer',
  'distributor',
  'snsUrls',
  'cost',
  'imgUrls',
  'iconUrl',
]) {}
