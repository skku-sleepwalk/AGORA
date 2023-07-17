import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreGenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
