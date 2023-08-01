import { PickType } from '@nestjs/swagger';
import { GameInformation } from 'src/entites/game.information.entity';

export class CreateGameInformationDto extends PickType(GameInformation, [
  'description',
  'specification',
]) {}
