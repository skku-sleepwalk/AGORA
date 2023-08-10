import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSubscribeService } from '../services/user.subscribe.service';
import { CreateUserSubscribeDto } from '../dto/create.user.subscribe.dto';

@ApiTags('User')
@Controller('users/{userId}/subscribe')
export class UserSubscribeController {
  constructor(private readonly userSubscribeService: UserSubscribeService) {}

  @ApiOperation({ summary: '구독하기' })
  @Post()
  async subscribe(
    @Param('userId') userId: string,
    @Body() data: CreateUserSubscribeDto,
  ) {
    return this.userSubscribeService.subscribe(
      userId,
      data.remainPlayTime,
      data.duration,
    );
  }
}
