import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Game } from 'src/entites/game.entity';

export class UpdateGameDto extends PickType(PartialType(Game), [
  'downloadUrl',
  'executablePath',
]) {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['FPS'], description: '장르 이름들' })
  genreNames: Array<string>;
}
