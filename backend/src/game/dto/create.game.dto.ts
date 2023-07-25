import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Game } from 'src/entites/game.entity';

export class CreateGameDto extends PickType(PartialType(Game), [
  'title',
  'downloadUrl',
  'executablePath',
]) {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['FPS'], description: '장르 이름들' })
  genreNames: Array<string>;
}
