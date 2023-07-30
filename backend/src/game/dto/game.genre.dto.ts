import { PickType } from '@nestjs/swagger';
import { GameGenre } from 'src/entites/game.genre.entity';

export class GameGenreDto extends PickType(GameGenre, ['id', 'name']) {}
