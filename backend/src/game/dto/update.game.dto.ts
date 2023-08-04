import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Game } from 'src/entites/game/game.entity';

export class UpdateGameDto extends PickType(PartialType(Game), [
  'downloadUrl',
  'executablePath',
  'shortContent',
  'shortImgUrl',
  'iconUrl',
]) {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['FPS'], description: '장르 이름들' })
  genreNames: Array<string>;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '게임의 대한 상세 설명',
    description: '게임 상세 설명',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '게임 사양', description: '게임 사양' })
  specification: string;
}
