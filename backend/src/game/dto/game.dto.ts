import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Game } from 'src/entites/game.entity';
import { GameDescriptionDto } from './game.description.dto';
import { GameTagDto } from './game.tag.dto';

export class GameDto extends PickType(PartialType(Game), [
  'id',
  'title',
  'downloadUrl',
  'executablePath',
  'shortContent',
  'shortImgUrl',
  'rating',
  'createdAt',
  'deletedAt',
  'updatedAt',
]) {
  @ApiProperty({ description: '좋아요 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  likeCount?: number;

  @ApiProperty({ description: '좋아요 여부' })
  @IsNotEmpty()
  @IsBoolean()
  like?: boolean;

  @ApiProperty({ description: '게임 설명', type: () => GameDescriptionDto })
  @IsNotEmpty()
  @ValidateNested()
  description: GameDescriptionDto;

  @ApiProperty({ description: '인기 태그들', type: () => GameTagDto })
  @IsNotEmpty()
  @ValidateNested()
  popularTags: Array<GameTagDto>;
}
