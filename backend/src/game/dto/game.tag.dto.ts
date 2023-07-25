import { PartialType, PickType } from '@nestjs/swagger';
import { GameTag } from 'src/entites/game.tag.entity';

export class GameTagDto extends PickType(PartialType(GameTag), [
  'id',
  'name',
]) {}
