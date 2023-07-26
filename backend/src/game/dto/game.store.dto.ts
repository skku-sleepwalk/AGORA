import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { GameStore } from 'src/entites/game.store.entity';
import { GameCostDto } from './game.cost.dto';

export class GameStoreDto extends PickType(PartialType(GameStore), [
  'id',
  'price',
  'snsUrls',
  'title',
]) {
  @ApiProperty({ description: '가격 상세', type: () => GameCostDto })
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
