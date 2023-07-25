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
import { Users } from 'src/common/decorators/user.decorator';
import { User } from 'src/entites/user.entity';
import { GameStoreDto } from 'src/game/dto/game.store.dto';
import { UpdateCommunityBoardDto } from 'src/community/dto/update.community.board.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameStore')
@Controller('game/stores')
export class GameStoresController {
  constructor(private gamestoresService: GameStoresService) {}

  @ApiOperation({ summary: '게임스토어 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  postGameStore(
    // @Users() user: User,
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameStoreDto,
  ) {
    return this.gamestoresService.postGameStore(
      userEmail,
      data.gameId,
      data.title,
      data.shortContent,
      data.shortImgUrl,
      data.cost,
      data.snsUrls,
      data.developer,
      data.distributor,
    );
  }

  @ApiOperation({ summary: '게임스토어 가져오기' })
  @ApiResponse({ type: GameStoreDto })
  @Get(':id')
  getGameStore(@Param('id') id: string) {
    return;
  }

  @ApiOperation({ summary: '게임스토어 장르별로 가져오기' })
  @ApiResponse({ type: GameStoreDto })
  @ApiQuery({
    name: 'beforeCursor',
    description: '이전 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'afterCursor',
    description: '다음 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'genreName',
    description: '장르 이름',
    required: true,
  })
  @Get()
  getGameStoreByGenre(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('genreName')
    genreName: string,
  ) {
    return '여러개 가져왔음';
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
    @Param('id') id: string,
    @Body() data: UpdateCommunityBoardDto,
  ) {
    return;
  }

  @ApiOperation({ summary: '좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch('/like/:id')
  likeGameStore(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
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
