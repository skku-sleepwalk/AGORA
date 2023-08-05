import { ApiProperty } from '@nestjs/swagger';
import { GameDto } from 'src/game/dto/game.dto';

export class PlaytimesDto {
  @ApiProperty({ description: '게임', type: () => GameDto })
  game: GameDto;
  @ApiProperty({ description: '플레이 시간', example: 100 })
  playtime: number;
}
