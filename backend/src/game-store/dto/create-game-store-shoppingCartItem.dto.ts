import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameStoreShoppingCartItemDto {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;
}
