import { PickType } from '@nestjs/swagger';
import { GameInformation } from 'src/entites/game.information.entity';

export class GameInformationDto extends PickType(GameInformation, [
  'id',
  'description',
  'specification',
]) {}
