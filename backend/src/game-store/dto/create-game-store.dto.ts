import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Cost, SNSUrls, ShortDescription } from '../entities/game-store.entity';

export class CreateGameStoreDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  distributor: string;

  @IsNotEmpty()
  @IsString()
  developer: string;

  @IsNotEmpty()
  @ValidateNested()
  snsUrls: SNSUrls;

  @IsNotEmpty()
  @ValidateNested()
  shortDescription: ShortDescription;

  @IsNotEmpty()
  @IsArray()
  genreNames: Array<string>;

  @IsNotEmpty()
  @ValidateNested()
  cost: Cost;
}
