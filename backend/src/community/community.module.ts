import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCategory } from 'src/entites/community/community.category.entity';
import { CommunityBoard } from 'src/entites/community/community.board.entity';
// import { CommunityBoardService } from './services/community.board.service';
import { CommunityCategoryService } from './services/community.category.service';
import { CommunityBoardController } from './controllers/community.board.controller';
import { CommunityCategoryController } from './controllers/community.category.controller';
import { User } from 'src/entites/user.entity';
import { CommunityBoardService } from './services/community.board.service';
import { CommunityBoardLike } from 'src/entites/community/community.board.like.entity';
import { CommunityBoardLikeService } from './services/community.board.like.service';
import { CommunityBoardLikeController } from './controllers/community.board.like.controller';
import { CommunityBoardView } from 'src/entites/community/community.board.view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunityBoard,
      CommunityCategory,
      CommunityBoardLike,
      CommunityBoardView,
      User,
    ]),
  ],
  providers: [
    CommunityBoardService,
    CommunityBoardLikeService,
    CommunityCategoryService,
  ],
  controllers: [
    CommunityBoardController,
    CommunityBoardLikeController,
    CommunityCategoryController,
  ],
})
export class CommunityModule {}
