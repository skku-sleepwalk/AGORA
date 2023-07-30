import {
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedtoNull.interceptor';
import { CommunityBoardLikeService } from '../services/community.board.like.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Community')
@Controller('community/board/:boardId/like')
export class CommunityBoardLikeController {
  constructor(private communityBoardLikeService: CommunityBoardLikeService) {}

  @ApiOperation({ summary: '좋아요 생성' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Post()
  PostGameBoardLike(
    @Headers('Authorization') userEmail: string,
    @Param('boardId') boardId: string,
  ) {
    return this.communityBoardLikeService.postGameBoardLike(userEmail, boardId);
  }

  @ApiOperation({ summary: '좋아요 삭제' })
  @ApiHeader({ name: 'Authorization', description: '유저 이메일' })
  @Delete()
  DeleteGameBoardLike(
    @Headers('Authorization') userEmail: string,
    @Param('boardId') boardId: string,
  ) {
    return this.communityBoardLikeService.deleteGameBoardLike(
      userEmail,
      boardId,
    );
  }
}
