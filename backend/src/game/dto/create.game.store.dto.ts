import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GameStore } from 'src/entites/game.store.entity';

export class CreateGameStoreDto extends PickType(GameStore, [
  'title',
  'shortContent',
  'shortImgUrl',
  'cost',
  'snsUrls',
  'developer',
  'distributor',
]) {
  @ApiProperty({ description: '게임 아이디' })
  @IsNotEmpty()
  @IsString()
  gameId: string;
}
