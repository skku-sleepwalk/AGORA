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
import { GameService } from '../services/game.service';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameDto } from '../dto/create.game.dto';
import { GameDto } from '../dto/game.dto';
import { UpdateGameDto } from '../dto/update.game.dto';
import { UpdateGameTagRelationDto } from '../dto/update.game.tag.relation.dto';

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
      data.genreNames,
    );
  }

  @ApiOperation({ summary: '게임 불러오기' })
  @ApiResponse({ type: GameDto })
  @Get(':id')
  GetOneGame(@Param('id') gameId: string) {
    return this.gameService.getOneGame(gameId);
  }

  @ApiOperation({ summary: '게임 업데이트' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id')
  UpdateGame(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameId: string,
    @Body() data: UpdateGameDto,
  ) {
    console.log(userEmail, gameId);

    return this.gameService.updateGame(
      userEmail,
      gameId,
      data.downloadUrl,
      data.executablePath,
      data.genreNames,
    );
  }

  @ApiOperation({ summary: '게임 태그 수정' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Patch(':id/tag')
  UpdateGameTagRelation(
    @Headers('Authorization') userEmail: string,
    @Param('id') gameId: string,
    @Body() data: UpdateGameTagRelationDto,
  ) {
    return this.gameService.updateGameTagRelation(
      userEmail,
      gameId,
      data.tagNames,
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
