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
import { CommunityBoardService } from '../services/community.board.service';
import { CreateCommunityBoardDto } from '../dto/create.community.board.dto';
import { CommunityBoardDto } from 'src/community/dto/communityBoard.dto';
import { UpdateCommunityBoardDto } from '../dto/update.community.board.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Community')
@Controller('community/board')
export class CommunityBoardController {
  constructor(private communityBoardService: CommunityBoardService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  postCommunityBoard(
    @Headers('Authorization') userEmail: string,
    @Body() data: CreateCommunityBoardDto,
  ) {
    return this.communityBoardService.createBoard(
      userEmail,
      data.title,
      data.content,
      data.categoryNames,
      data.parentId,
    );
  }

  @ApiOperation({ summary: '게시글 하나 가져오기' })
  @ApiResponse({ type: CommunityBoardDto })
  @Get(':id')
  getCommunityBoard(@Param('id') id: string) {
    return '하나 가져왔음';
  }

  @ApiOperation({ summary: '게시글 카테고리별로 가져오기' })
  @ApiResponse({ type: CommunityBoardDto })
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
  getCommunityBoardByCategory(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
  ) {
    return '여러개 가져왔음';
  }

  @ApiOperation({ summary: '게시글 검색' })
  @ApiResponse({ type: CommunityBoardDto })
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
  searchCommunityBoard(
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
    @Query(
      'categoryNames',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    categoryNames: Array<string>,
    @Query('q') search: string,
  ) {
    return;
  }

  @ApiOperation({ summary: '자식 게시글 가져오기' })
  @ApiResponse({ type: CommunityBoardDto })
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
  getChild(
    @Param('parentId') parentId: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('afterCursor') afterCursor: string,
  ) {
    return;
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  updateCommunityBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
    @Body() data: UpdateCommunityBoardDto,
  ) {
    return;
  }

  @ApiOperation({ summary: '좋아요' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch('/like/:id')
  likeCommunityBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
  ) {
    return;
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete(':id')
  deleteCommunityBoard(
    @Headers('Authorization') userEmail: string,
    @Param('id') id: string,
  ) {
    return;
  }
}
