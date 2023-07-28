import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Game } from 'src/entites/game.entity';
import { GameDescriptionDto } from './game.description.dto';
import { GameTagDto } from './game.tag.dto';
import { GameStoreDto } from './game.store.dto';

export class GameDto extends PickType(Game, [
  'id',
  'title',
  'downloadUrl',
  'executablePath',
  'shortContent',
  'shortImgUrl',
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

  @ApiProperty({
    description: '게임 스토어',
    type: () => GameStoreDto,
    required: false,
  })
  @IsNotEmpty()
  @ValidateNested()
  store: GameStoreDto;

  @ApiProperty({
    example: 4.5,
    description: '별점(소숫점 첫째자리까지 나타냄)',
  })
  @IsNotEmpty()
  rating?: number;

  @ApiProperty({ description: '게임 설명', type: () => GameDescriptionDto })
  @IsNotEmpty()
  @ValidateNested()
  description: GameDescriptionDto;

  @ApiProperty({ description: '인기 태그들', type: () => GameTagDto })
  @IsNotEmpty()
  @ValidateNested()
  popularTags: Array<GameTagDto>;
}
