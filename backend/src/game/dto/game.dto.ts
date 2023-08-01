import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Game } from 'src/entites/game.entity';
import { GameInformationDto } from './game.information.dto';
import { GameTagDto } from './game.tag.dto';
import { GameStoreDto } from './game.store.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { GameGenreDto } from './game.genre.dto';

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
    description: '작성자(추후 수정예정) 정보',
    type: () => UserDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  author: UserDto;

  @ApiProperty({
    example: 4.5,
    description: '별점(소숫점 첫째자리까지 나타냄)',
  })
  @IsNotEmpty()
  rating?: number;

  @ApiProperty({ description: '게임 설명', type: () => GameInformationDto })
  @IsNotEmpty()
  @ValidateNested()
  information: GameInformationDto;

  @ApiProperty({
    description: '장르들',
    type: GameGenreDto,
    isArray: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  genres: Array<GameGenreDto>;

  @ApiProperty({
    description: '인기 태그들',
    type: GameTagDto,
    isArray: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  popularTags?: Array<GameTagDto>;
}
