import { PartialType, PickType } from '@nestjs/swagger';
import { GameDescription } from 'src/entites/game.description.entity';

export class GameDescriptionDto extends PickType(PartialType(GameDescription), [
  'id',
  'content',
]) {}
