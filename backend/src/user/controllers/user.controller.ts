import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsersDto } from '../dto/create.users.dto';
import { UserService } from '../services/user.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { Users } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoginUserDto } from '../dto/login.user.dto';
import { UuidParam } from 'src/common/decorators/uuid-param.dacorator';
import { GameService } from 'src/game/services/game.service';
import { CursoredUserProfileGameDto } from 'src/common/dto/cursoredData.dto';
import { AssetService } from 'src/asset/services/asset.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  postUsers(@Body() data: CreateUsersDto) {
    return this.userService.postUsers(
      data.email,
      data.name,
      data.password,
      data.description,
    );
  }

  @Get()
  @ApiOperation({ summary: '유저 전체 조회' })
  @ApiResponse({ type: UserDto, isArray: true })
  get() {
    return this.userService.get();
  }

  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiParam({
    name: 'id | me',
    required: true,
    description: '유저 아이디 | me',
  })
  @Get(':id')
  getUsers(
    @Param('id') id: string,
    @Headers('Authorization') userEmail?: string,
  ) {
    if (id === 'me' && userEmail) {
      return this.userService.getMe(userEmail);
    }
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: '업로드한 게임 조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CursoredUserProfileGameDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 아이디',
  })
  @ApiQuery({
    name: 'afterCursor',
    required: false,
    description: '다음 페이지 커서',
  })
  @ApiQuery({
    name: 'beforeCursor',
    required: false,
    description: '이전 페이지 커서',
  })
  @Get(':id/games')
  getGames(
    @UuidParam('id') id: string,
    @Query('afterCursor') afterCursor?: string,
    @Query('beforeCursor') beforeCursor?: string,
  ) {
    return this.userService.getGameByUser(id, { afterCursor, beforeCursor });
  }

  @ApiOperation({ summary: '업로드한 에셋 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 아이디',
  })
  @ApiQuery({
    name: 'afterCursor',
    required: false,
    description: '다음 페이지 커서',
  })
  @ApiQuery({
    name: 'beforeCursor',
    required: false,
    description: '이전 페이지 커서',
  })
  @Get(':id/assets')
  getAssets(
    @UuidParam('id') id: string,
    @Query('afterCursor') afterCursor?: string,
    @Query('beforeCursor') beforeCursor?: string,
  ) {
    return this.userService.getAssetByUser(id, { afterCursor, beforeCursor });
  }

  @ApiResponse({ status: 200, description: '성공', type: UserDto })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiOperation({ summary: '로그인' })
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@Body() data: LoginUserDto) {
    return this.userService.login(data.email, data.password);
  }

  // @ApiResponse({ status: 200, description: '성공', type: UserDto })
  // @ApiResponse({ status: 500, description: '서버에러' })
  // @ApiOperation({summary: '유저 정보 수정'})

  // @ApiOperation({ summary: '로그아웃' })
  // @Post('logout')
  // logOut(@Req() req, @Res() res) {
  //   req.logOut();
  //   res.clearCookie('connect.sid', { httpOnly: true });
  //   res.send('ok');
  // }
}
