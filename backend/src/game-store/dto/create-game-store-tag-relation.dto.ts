import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreTagRelationDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsArray()
  tagNames: Array<string>;
}
