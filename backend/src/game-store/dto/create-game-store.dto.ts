import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Cost,
  GameStoreGenre,
  SNSUrls,
  shortDescription,
} from '../entities/game-store.entity';

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
  shortDescription: shortDescription;

  @IsNotEmpty()
  @IsArray()
  genreNames: Array<string>;

  @IsNotEmpty()
  @ValidateNested()
  cost: Cost;
}
