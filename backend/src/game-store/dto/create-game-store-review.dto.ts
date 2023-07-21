import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameStoreReviewDto {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
