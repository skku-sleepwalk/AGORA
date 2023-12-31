import {
  Body,
  Controller,
  Headers,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CreateGameInformationDto } from '../dto/create.game.information.dto';
import { GameInformationService } from '../services/game.information.service';
import { UpdateGameInformationDto } from '../dto/update.game.information.dto';
import { GameInformationDto } from '../dto/game.information.dto';
import { UserEmail } from 'src/common/decorators/userEmail.dacorator';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('GameInformation')
@Controller('game/:gameId/description')
export class GameInformationController {
  constructor(private gameInformationService: GameInformationService) {}

  @ApiOperation({ description: '게임 설명 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameId', description: '게임 아이디' })
  @Post()
  PostGameInformation(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameId') gameId: string,
    @UuidParam('gameId') gameId: string,
    @Body() data: CreateGameInformationDto,
  ) {
    this.gameInformationService.postGameInformation(
      userEmail,
      gameId,
      data.description,
      data.specification,
    );
  }

  @ApiOperation({ description: '게임 설명 수정' })
  @ApiResponse({ type: GameInformationDto })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @ApiParam({ name: 'gameInformationId', description: '게임 설명 아이디' })
  @Patch(':gameInformationId')
  patchGameInformation(
    // @Headers('Authorization') userEmail: string,
    @UserEmail() userEmail: string,
    // @Param('gameInformationId') gameInformationId: string,
    @UuidParam('gameInformationId') gameInformationId: string,
    @Body() data: UpdateGameInformationDto,
  ) {
    this.gameInformationService.patchGameInformation(
      userEmail,
      gameInformationId,
      data.description,
      data.specification,
    );
  }
}
