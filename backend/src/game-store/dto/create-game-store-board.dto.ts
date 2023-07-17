import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameStoreBoardDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly parentId: string;

  @IsOptional()
  @IsArray()
  readonly categoryNames: Array<string>;
}
