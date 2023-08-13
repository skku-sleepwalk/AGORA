import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game')
@Controller('game')
export class GameContorller {
  constructor(private gameService: GameService) {}
  @ApiOperation({ summary: '게임 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  // @UsePipes(new HeaderValidationPipe())
  PostGame(
    // @Headers() userEmail: string,
    @UserEmail() userEmail: string,
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
      data.description,
      data.specification,
      data.iconUrl,
    );
  }

  @ApiOperation({ summary: '게임 검색' })
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
    // @Headers() userEmail: string,
    @UserEmail() userEmail: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query('q') keyword: string,
    @Query('genreNames', new ParseArrayPipe({ items: String, separator: ',' }))
    genreNames: Array<string>,
  ) {
    if (keyword) {
      return this.gameService.searchGame(
        userEmail,
        { beforeCursor, afterCursor },
        genreNames,
        keyword,
      );
    } else {
      console.log('검색어 없음');
      return this.gameService.getGameByGenres(
        userEmail,
        { beforeCursor, afterCursor },
        genreNames,
      );
    }
  }

  // @ApiOperation({ summary: '게임 장르(다수)별로 불러오기' })
  // @ApiResponse({ type: CursoredGameDto })
  // @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  // @ApiQuery({
  //   name: 'beforeCursor',
  //   description: '이전 페이지 커서(페이지네이션 옵션)',
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'afterCursor',
  //   description: '다음 페이지 커서(페이지네이션 옵션)',
  //   required: false,
  // })
  // @ApiQuery({ name: 'q', description: '검색 내용' })
  // @ApiQuery({
  //   name: 'genreNames',
  //   description: '장르 이름들',
  // })
  // @Get('genres')
  // getGameByGenres(
  //   // @Headers() userEmail: string,
  //   @UserEmail() userEmail: string,
  //   @Query('beforeCursor') beforeCursor: string,
  //   @Query('afterCursor') afterCursor: string,
  //   @Query('genreNames', new ParseArrayPipe({ items: String, separator: ',' }))
  //   genreNames: Array<string>,
  // ) {
  //   return this.gameService.getGameByGenres(
  //     userEmail,
  //     { beforeCursor, afterCursor },
  //     genreNames,
  //   );
  // }

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
  GetGameByGenre(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
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

  @ApiOperation({ summary: '게임 불러오기' })
  @ApiResponse({ type: GameDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Get(':gameId')
  GetOneGame(
    @UuidParam('gameId') gameId: string,
    @Headers('Authorization') userEmail: string,
  ) {
    return this.gameService.getOneGame(userEmail, gameId);
  }

  @ApiOperation({ summary: '게임 업데이트' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':gameId')
  UpdateGame(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('id') gameId: string,
    @UuidParam('gameId') gameId: string,
    @Body() data: UpdateGameDto,
  ) {
    return this.gameService.updateGame(
      userEmail,
      gameId,
      data.downloadUrl,
      data.executablePath,
      data.genreNames,
      data.description,
      data.specification,
      data.iconUrl,
    );
  }

  @ApiOperation({ summary: '게임 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':gameId')
  DeleteGame(
    @Headers('Authorization') userEmail: string,
    @UuidParam('gameId') gameId: string,
    // @Param('id') gameId: string,
  ) {
    return this.gameService.deleteGame(userEmail, gameId);
  }
}
