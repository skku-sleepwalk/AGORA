import { PartialType } from '@nestjs/swagger';
import { CreateGameStoreDto } from './create-game-store.dto';

export class UpdateGameStoreDto extends PartialType(CreateGameStoreDto) {}
