import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { Users } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  postUsers(@Body() data: CreateUsersDto) {
    return this.userService.postUsers(
      data.email,
      data.name,
      // data.password,
      data.description,
    );
  }

  @Get()
  get() {
    return this.userService.get();
  }

  @ApiResponse({ type: UserDto })
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiParam({ name: 'id', required: true, description: '유저 아이디' })
  @Get(':id')
  getUsers(@Param('id') id) {
    return id;
  }

  @ApiResponse({ status: 200, description: '성공', type: UserDto })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@Users() user) {
    return user;
  }

  // @ApiResponse({ status: 200, description: '성공', type: UserDto })
  // @ApiResponse({ status: 500, description: '서버에러' })
  // @ApiOperation({summary: '유저 정보 수정'})

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
