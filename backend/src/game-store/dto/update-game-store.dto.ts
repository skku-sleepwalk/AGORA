import { PartialType } from '@nestjs/swagger';
import { CreateGameStoreDto } from './create-game-store.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGameStoreDto extends PartialType(CreateGameStoreDto) {
  @IsNotEmpty()
  @IsString()
  gameStoreId: string;
}
