import { IsNotEmpty, IsString } from 'class-validator';
import { tagType } from '../entities/game-store.entity';

export class CreateGameStoreTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tagType: tagType;
}
