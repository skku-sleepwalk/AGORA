import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
