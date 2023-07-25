import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Game } from 'src/entites/game.entity';
import { GameDescriptionDto } from './game.description.dto';
import { GameTagDto } from './game.tag.dto';

export class GameDto extends PickType(PartialType(Game), [
  'id',
  'downloadUrl',
  'executablePath',
  'title',
  'createdAt',
  'rating',
]) {
  @ApiProperty({ description: '게임 설명', type: () => GameDescriptionDto })
  @IsNotEmpty()
  @ValidateNested()
  description: GameDescriptionDto;

  @ApiProperty({ description: '인기 태그들', type: () => GameTagDto })
  @IsNotEmpty()
  @ValidateNested()
  popularTags: Array<GameTagDto>;
}
