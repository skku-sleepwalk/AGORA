import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreTagDto } from './dto/create-game-tag.dto';
import { CreateGameStoreReviewDto } from './dto/create-game-store-review.dto';
import { likeAction } from './entities/game-store-review.entity';
import { CreateGameStoreReviewCommentDto } from './dto/create-game-store-review-comment.dto';

@Controller('game-store')
export class GameStoreController {
  constructor(private readonly gameStoreService: GameStoreService) {}

  @Post()
  createGameStore(
    @Headers('Authorization') authorEmail: string,
    @Body() createGameStoreDto: CreateGameStoreDto,
  ) {
    return this.gameStoreService.createGameStore(
      authorEmail,
      createGameStoreDto,
    );
  }

  @Post('tags')
  createGameStoreTag(@Body() createGameStoreTagDto: CreateGameStoreTagDto) {
    return this.gameStoreService.createGameStoreTag(createGameStoreTagDto);
  }

  @Post('reviews')
  createGameStoreReview(
    @Headers('Authorization') writerEmail: string,
    @Body() createGameStoreReviewDto: CreateGameStoreReviewDto,
  ) {
    return this.gameStoreService.createGameStoreReview(
      writerEmail,
      createGameStoreReviewDto,
    );
  }

  @Post('reviews/comment')
  createGameStoreReviewComment(
    @Headers('Authorization') writerEmail: string,
    @Body() createGameStoreReviewCommentDto: CreateGameStoreReviewCommentDto,
  ) {
    return this.gameStoreService.createGameStoreReviewComment(
      writerEmail,
      createGameStoreReviewCommentDto,
    );
  }
  @Post('boards')
  createGameStoreBoard(
    @Headers('Authorization') writerEmail: string,
    @Body() createGameStoreBoardDto: CreateGameStoreBoardDto,
  ) {
    return this.gameStoreService.createGameStoreBoards(
      writerEmail,
      createGameStoreBoardDto,
    );
  }

  @Post('boards/category')
  createGameStoreBoardCategory(
    @Body() createGameStoreBoardCategoryDto: CreateGameStoreBoardCategoryDto,
  ) {
    return this.gameStoreService.createGameStoreBoardCategory(
      createGameStoreBoardCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.gameStoreService.findAll();
  }

  @Get('/tag')
  findByTag(
    @Query('name') tagName: string,
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
  ) {
    return this.gameStoreService.findGameStoreByTag(
      { afterCursor, beforeCursor },
      tagName,
    );
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.gameStoreService.findOneGameStore(id);
  }

  @Patch()
  update(
    @Query('id') id: string,
    @Body() updateGameStoreDto: UpdateGameStoreDto,
  ) {
    return this.gameStoreService.update(+id, updateGameStoreDto);
  }

  @Patch('/like')
  gameStoreLikeUpdate(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreId: string,
  ) {
    return this.gameStoreService.gameStoreLikeUpdate(gameStoreId, userEmail);
  }

  @Patch('/reviews/like')
  gameStoreReviewLikeUpdate(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewId: string,
    @Query('action') likeAction: likeAction,
  ) {
    return this.gameStoreService.gameStoreReviewLikeUpdate(
      gameStoreReviewId,
      userEmail,
      likeAction,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameStoreService.remove(+id);
  }
}
