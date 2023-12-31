import { PickType } from '@nestjs/swagger';
import { GameGenre } from 'src/entites/game/game.genre.entity';

export class CreateGameGenreDto extends PickType(GameGenre, ['name']) {}
