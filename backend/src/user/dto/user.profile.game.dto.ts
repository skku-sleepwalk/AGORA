import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Game } from 'src/entites/game/game.entity';
import { GameStoreDto } from 'src/game/dto/game.store.dto';

export class UserProfileGameDto extends PickType(Game, ['id', 'shortImgUrl']) {
  @ApiProperty({ description: '평균 플레이시간' })
  @IsNotEmpty()
  @IsNumber()
  readonly avgPlaytime: number;

  @ApiProperty({ description: '좋아요 수' })
  @IsNotEmpty()
  @IsNumber()
  readonly likeCount: number;

  @ApiProperty({ description: '게임 스토어', type: GameStoreDto })
  @IsNotEmpty()
  @ValidateNested()
  readonly store: GameStoreDto;
}
