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

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Game Board')
@Controller('game/:gameId/board')
export class GameBoardController {
  constructor(private gameBoardService: GameBoardService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameBoard(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateGameBoardDto,
  ) {
    return this.gameBoardService.postGameBoard(
      userEmail,
      data.title,
      data.content,
      data.parentId,
      data.categoryNames,
    );
  }

  @ApiOperation({ summary: '게시글 카테고리별로 가져오기' })
  @ApiResponse({ type: GameBoardDto })
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
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
  ) {
    return this.gameBoardService.getGameBoardByCategory(
      { beforeCursor, afterCursor },
      categoryNames,
    );
  }

  @ApiOperation({ summary: '게시글 검색' })
  @ApiResponse({ type: GameBoardDto })
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
  SearchGameBoard(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
    @Query('q') search: string,
  ) {
    return this.gameBoardService.searchGameBoard(
      { beforeCursor, afterCursor },
      categoryNames,
      search,
    );
  }

  @ApiOperation({ summary: '자식 게시글 가져오기' })
  @ApiResponse({ type: GameBoardDto })
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
    @Param('parentId') parentId: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
  ) {
    return this.gameBoardService.getChild(
      { beforeCursor, afterCursor },
      parentId,
    );
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  UpdateGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
    @Body() data: UpdateGameBoardDto,
  ) {
    return this.gameBoardService.updateGameBoard(
      userEmail,
      data.title,
      data.content,
      data.categoryNames,
    );
  }

  @ApiOperation({ summary: '좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch('/like/:id')
  LikeGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameBoardId: string,
  ) {
    return this.gameBoardService.likeGameBoard(userEmail, gameBoardId);
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  DeleteGameBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameBoardId: string,
  ) {
    return this.gameBoardService.deleteGameBoard(userEmail, gameBoardId);
  }
}
