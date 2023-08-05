import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { GameStore } from 'src/entites/game/game.store.entity';
import { GameCostDto } from './game.cost.dto';

export class GameStoreDto extends PickType(GameStore, [
  'id',
  'snsUrls',
  'title',
  'imgUrls',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({ description: '가격 정보', type: () => GameCostDto })
  @IsNotEmpty()
  @ValidateNested()
  cost: GameCostDto;

  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;
}
