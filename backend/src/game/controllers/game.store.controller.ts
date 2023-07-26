import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameStoreService } from '../services/game.store.service';
import { CreateGameStoreDto } from '../dto/create.game.store.dto';
import { GameStoreDto } from 'src/game/dto/game.store.dto';
import { UpdateGameStoreDto } from '../dto/update.game.store.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameStore')
@Controller('game/:gameId/store')
export class GameStoresController {
  constructor(private gameStoreService: GameStoreService) {}

  @ApiOperation({ summary: '게임스토어 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameStore(
    // @Users() user: User,
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: CreateGameStoreDto,
  ) {
    return this.gameStoreService.postGameStore(
      userEmail,
      gameId,
      data.title,
      data.cost,
      data.snsUrls,
      data.developer,
      data.distributor,
    );
  }

  @ApiOperation({ summary: '게임스토어 가져오기' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiResponse({ type: GameStoreDto })
  @Get()
  GetGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameStoreId: string,
  ) {
    return this.gameStoreService.getGameStore(userEmail, gameStoreId);
  }

  @ApiOperation({ summary: '게임스토어 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch()
  UpdateGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: UpdateGameStoreDto,
  ) {
    return this.gameStoreService.updateGameStore(
      userEmail,
      gameId,
      data.cost,
      data.developer,
      data.distributor,
      data.snsUrls,
      data.title,
    );
  }
}
