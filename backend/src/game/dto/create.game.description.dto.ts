import { PickType } from '@nestjs/swagger';
import { GameDescription } from 'src/entites/game.description.entity';

export class CreateGameDescriptionDto extends PickType(GameDescription, [
  'content',
]) {}
