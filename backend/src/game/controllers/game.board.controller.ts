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
import { GameBoardService } from '../services/game.board.service';
import { CreateGameBoardDto } from '../dto/create.game.board.dto';
import { GameBoardDto } from '../dto/game.board.dto';
import { UpdateGameBoardDto } from '../dto/update.game.board.dto';
import { CursoredGameBoardDto } from 'src/common/dto/cursoredData.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameBoard')
@Controller('game/:gameId/board')
export class GameBoardController {
  constructor(private gameBoardService: GameBoardService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Body() data: CreateGameBoardDto,
  ) {
    return this.gameBoardService.postGameBoard(
      userEmail,
      gameId,
      data.title,
      data.content,
      data.parentId,
      data.categoryNames,
    );
  }

  @ApiOperation({ summary: '게시글 카테고리별로 가져오기' })
  @ApiResponse({ type: CursoredGameBoardDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiQuery({
    name: 'beforeCursor',
    description: '이전 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'afterCursor',
    description: '다음 페이지 커서(페이지네이션 옵션)',
  })
  @ApiQuery({
    name: 'categoryNames',
    description: '카테고리 이름들',
    required: true,
  })
  @Get()
  GetGameBoardByCategory(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
  ) {
    return this.gameBoardService.getGameBoardByCategory(
      userEmail,
      { beforeCursor, afterCursor },
      gameId,
      categoryNames,
    );
  }

  @ApiOperation({ summary: '게시글 검색' })
  @ApiResponse({ type: CursoredGameBoardDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
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
  @ApiQuery({ name: 'boardType', description: '게시글 타입', required: true })
  SearchGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
    @Query('q') search: string,
    @Query('boardType') boardType: 'parent' | 'child',
  ) {
    return this.gameBoardService.searchGameBoard(
      userEmail,
      { beforeCursor, afterCursor },
      gameId,
      categoryNames,
      search,
      boardType,
    );
  }

  @ApiOperation({ summary: '자식 게시글 가져오기' })
  @ApiResponse({ type: CursoredGameBoardDto })
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
  @Get('getChild/:parentId')
  GetChild(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('parentId') parentId: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
  ) {
    return this.gameBoardService.getChild(
      userEmail,
      { beforeCursor, afterCursor },
      gameId,
      parentId,
    );
  }

  @ApiOperation({ summary: '게시글 하나 가져오기' })
  @ApiResponse({ type: GameBoardDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Get(':boardId')
  GetOneGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('boardId') boardId: string,
  ) {
    return this.gameBoardService.getOneGameBoard(userEmail, gameId, boardId);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':boardId')
  UpdateGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('boardId') boardId: string,
    @Body() data: UpdateGameBoardDto,
  ) {
    return this.gameBoardService.updateGameBoard(
      userEmail,
      gameId,
      boardId,
      data.title,
      data.content,
      data.categoryNames,
    );
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':boardId')
  DeleteGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('gameId') gameId: string,
    @Param('boardId') boardId: string,
  ) {
    return this.gameBoardService.deleteGameBoard(userEmail, gameId, boardId);
  }
}
