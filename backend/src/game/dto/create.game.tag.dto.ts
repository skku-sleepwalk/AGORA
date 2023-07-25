import { PickType } from '@nestjs/swagger';
import { GameTag } from 'src/entites/game.tag.entity';

export class CreateGameTagDto extends PickType(GameTag, ['name']) {}
