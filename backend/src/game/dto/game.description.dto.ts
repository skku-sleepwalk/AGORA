import { PickType } from '@nestjs/swagger';
import { GameInformation } from 'src/entites/game.description.entity';

export class GameInformationDto extends PickType(GameInformation, [
  'id',
  'description',
  'specification',
]) {}
