import { PickType } from '@nestjs/swagger';
import { GameTag } from 'src/entites/game/game.tag.entity';

export class CreateGameTagDto extends PickType(GameTag, ['name']) {}
