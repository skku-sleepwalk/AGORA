import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/entites/game/game.entity';

export class PlaytimesDto {
  @ApiProperty({ description: '게임', type: () => Game })
  game: Game;
  @ApiProperty({ description: '플레이 시간', example: 100 })
  playtime: number;
}
