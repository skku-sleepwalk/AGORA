import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/common/dto/user.dto';
import { GameStore } from 'src/entites/game.store.entity';
import { GameCostDto } from './game.cost.dto';

export class GameStoreDto extends PickType(PartialType(GameStore), [
  'id',
  'price',
  'snsUrls',
  'title',
  'shortContent',
  'shortImgUrl',
  'likeCount',
]) {
  @IsNotEmpty()
  @ApiProperty({ description: '작성자 정보', type: () => UserDto })
  author: UserDto;

  @IsNotEmpty()
  @ApiProperty({ description: '가격 상세', type: () => GameCostDto })
  cost: GameCostDto;
}
