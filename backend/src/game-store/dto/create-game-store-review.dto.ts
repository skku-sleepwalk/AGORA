import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreReviewDto {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
