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
import { GameService } from '../services/game.service';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameDto } from '../dto/create.game.dto';
import { GameDto } from '../dto/game.dto';
import { UpdateGameDto } from '../dto/update.game.dto';
import { CursoredGameDto } from 'src/common/dto/cursoredData.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game')
@Controller('game')
export class GameContorller {
  constructor(private gameService: GameService) {}
  @ApiOperation({ summary: '게임 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGame(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameDto,
  ) {
    return this.gameService.postGame(
      userEmail,
      data.title,
      data.downloadUrl,
      data.executablePath,
      data.shortContent,
      data.shortImgUrl,
      data.genreNames,
    );
  }

  @ApiOperation({ summary: '게시글 검색' })
  @ApiResponse({ type: CursoredGameDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
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
  @ApiQuery({ name: 'q', description: '검색 내용' })
  @ApiQuery({
    name: 'genreNames',
    description: '장르 이름들',
  })
  @Get('search')
  SearchGame(
    @Headers('Authorization') userEmail: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('q') search: string,
    @Query('genreNames', new ParseArrayPipe({ items: String, separator: ',' }))
    genreNames: Array<string>,
  ) {
    return this.gameService.searchGame(
      userEmail,
      { beforeCursor, afterCursor },
      genreNames,
      search,
    );
  }

  @ApiOperation({ summary: '게임 불러오기' })
  @ApiResponse({ type: GameDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Get(':id')
  GetOneGame(
    @Param('id') gameId: string,
    @Headers('Authorization') userEmail: string,
  ) {
    return this.gameService.getOneGame(userEmail, gameId);
  }

  @ApiOperation({ summary: '게임스토어 장르별로 가져오기' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiResponse({ type: CursoredGameDto })
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
  GetGameStoreByGenre(
    @Headers('Authorization') userEmail: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('genreName')
    genreName: string,
  ) {
    return this.gameService.getGameByGenre(
      userEmail,
      { beforeCursor, afterCursor },
      genreName,
    );
  }

  @ApiOperation({ summary: '게임 업데이트' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  UpdateGame(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameId: string,
    @Body() data: UpdateGameDto,
  ) {
    return this.gameService.updateGame(
      userEmail,
      gameId,
      data.downloadUrl,
      data.executablePath,
      data.genreNames,
    );
  }

  @ApiOperation({ summary: '게임 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  DeleteGame(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameId: string,
  ) {
    return this.gameService.deleteGame(userEmail, gameId);
  }
}
