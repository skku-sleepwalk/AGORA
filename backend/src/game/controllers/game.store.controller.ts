import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { GameStoresService } from '../services/game.store.service';
import { CreateGameStoreDto } from '../dto/create.game.store.dto';
import { GameStoreDto } from 'src/game/dto/game.store.dto';
import { UpdateGameStoreDto } from '../dto/update.game.store.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameStore')
@Controller('game/:gameId/store')
export class GameStoresController {
  constructor(private gamestoresService: GameStoresService) {}

  @ApiOperation({ summary: '게임스토어 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameStore(
    // @Users() user: User,
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: CreateGameStoreDto,
  ) {
    return this.gamestoresService.postGameStore(
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
  @Get(':id')
  GetGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameStoreId: string,
  ) {
    return this.gamestoresService.getGameStore(userEmail, gameStoreId);
  }

  @ApiOperation({ summary: '게시글 검색' })
  @ApiResponse({ type: GameStoreDto })
  @Get('/search')
  @ApiQuery({
    name: 'beforeCursor',
    description: '이전 페이지 커서(페이지네이션 옵션)',
    required: false,
  })
  @ApiQuery({
    name: 'afterCursor',
    description: '다음 페이지 커서(페이지네이션 옵션)',
    required: false,
  })
  @ApiQuery({
    name: 'categoryNames',
    description: '카테고리 이름들',
  })
  @ApiQuery({ name: 'q', description: '검색 내용' })
  searchGameStore(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('genreNames', new ParseArrayPipe({ items: String, separator: ',' }))
    genreNames: Array<string>,
    @Query('q') search: string,
  ) {
    return;
  }

  @ApiOperation({ summary: '게임스토어 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  updateGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameStoreId: string,
    @Body() data: UpdateGameStoreDto,
  ) {
    return;
  }

  @ApiOperation({ summary: '좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch('/like/:id')
  likeGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameStoreId: string,
  ) {
    return;
  }

  @ApiOperation({ summary: '게임스토어 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  deleteGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
  ) {
    return;
  }
}
