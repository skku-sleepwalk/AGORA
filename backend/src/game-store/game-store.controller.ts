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
  ParseArrayPipe,
} from '@nestjs/common';
import { GameStoreService } from './game-store.service';
import { CreateGameStoreDto } from './dto/create-game-store.dto';
import { UpdateGameStoreDto } from './dto/update-game-store.dto';
import { CreateGameStoreBoardDto } from './dto/create-game-store-board.dto';
import { CreateGameStoreBoardCategoryDto } from './dto/create-game-store-board-category.dto';
import { CreateGameStoreReviewDto } from './dto/create-game-store-review.dto';
import { CreateGameStoreReviewCommentDto } from './dto/create-game-store-review-comment.dto';
import { UpdatePlaytimeRelationDto } from './dto/update-playtime-relation.dto';
import { LikeAction } from './entities/game-store-review.entity';
import { UpdateGameStoreReviewCommentDto } from './dto/update-game-store-review-comment.dto';
import { UpdateGameStoreBoardDto } from './dto/update-game-store-board.dto';
import { CreateGameStoreGenreDto } from './dto/create-game-store-genre.dto';
import { UpdateGameStoreReviewDto } from './dto/update-game-store-review.dto';
import { CreateGameStoreTagDto } from './dto/create-game-store-tag.dto';
import { CreateGameStoreTagRelationDto } from './dto/create-game-store-tag-relation.dto';
import { CreatePlaytimeRelationDto } from './dto/create-playtime-relation.dto';

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

  @Post('genres')
  createGameStoreGenre(
    @Body() createGameStoreGenreDto: CreateGameStoreGenreDto,
  ) {
    return this.gameStoreService.createGameStoreGenre(createGameStoreGenreDto);
  }

  @Post('tags')
  createGameStoreTag(@Body() createGameStoreTagDto: CreateGameStoreTagDto) {
    return this.gameStoreService.createGameStoreTag(createGameStoreTagDto);
  }

  @Post('tagRelations')
  createGameStoreTagRelation(
    @Headers('Authorization') userEmail: string,
    @Body() createGameStoreTagRelationDto: CreateGameStoreTagRelationDto,
  ) {
    return this.gameStoreService.createGameStoreTagRelation(
      userEmail,
      createGameStoreTagRelationDto,
    );
  }

  @Post('playtimeRelations')
  createPlaytimeRelations(
    @Headers('Authorization') userEmail: string,
    @Body() createPlaytimeRelationDto: CreatePlaytimeRelationDto,
  ) {
    return this.gameStoreService.createPlayTimeRelation(
      userEmail,
      createPlaytimeRelationDto,
    );
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

  @Post('reviews/comments')
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

  @Get('/reviews')
  findGameStoreReview(
    @Query('afterCursor') afterCursor: string,
    @Query('beforeCursor') beforeCursor: string,
    @Query('gameStoreId') gameStoreId: string,
  ) {
    return this.gameStoreService.findGameStoreReview(
      { afterCursor, beforeCursor },
      gameStoreId,
    );
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.gameStoreService.findOneGameStore(id);
  }

  @Patch('/game')
  updateGameStore(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreId: string,
    @Body() updateGameStoreDto: UpdateGameStoreDto,
  ) {
    return this.gameStoreService.updateGameStore(
      userEmail,
      gameStoreId,
      updateGameStoreDto,
    );
  }

  @Patch('/like')
  updateGameStoreLike(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreId: string,
  ) {
    return this.gameStoreService.updateGameStoreLike(gameStoreId, userEmail);
  }

  @Patch('/playtimeRelation')
  updatePlaytimeRelation(
    @Headers('Authorization') userEmail: string,
    @Body() updatePlaytimeRelationDto: UpdatePlaytimeRelationDto,
  ) {
    this.gameStoreService.updatePlaytimeRelation(
      userEmail,
      updatePlaytimeRelationDto,
    );
  }

  @Patch('/reviews')
  updateGameStoreReview(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewId: string,
    @Body() updateGameStoreReviewDto: UpdateGameStoreReviewDto,
  ) {
    return this.gameStoreService.updateGameStoreReview(
      userEmail,
      gameStoreReviewId,
      updateGameStoreReviewDto,
    );
  }

  @Patch('/reviews/like')
  updateGameStoreReviewLike(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewId: string,
    @Query('action') likeAction: LikeAction,
  ) {
    return this.gameStoreService.updateGameStoreReviewLike(
      gameStoreReviewId,
      userEmail,
      likeAction,
    );
  }

  @Patch('reviews/comments')
  updateGameStoreReviewComment(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewCommentId: string,
    @Body() updateGameStoreReviewCommentDto: UpdateGameStoreReviewCommentDto,
  ) {
    return this.gameStoreService.updateGameStoreReviewComment(
      userEmail,
      gameStoreReviewCommentId,
      updateGameStoreReviewCommentDto,
    );
  }
  @Patch('/reviews/comments/like')
  updateGameStoreReviewCommentLike(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewCommentId: string,
    @Query('action') likeAction: LikeAction,
  ) {
    return this.gameStoreService.updateGameStoreReviewCommentLike(
      gameStoreReviewCommentId,
      userEmail,
      likeAction,
    );
  }

  @Patch('/boards')
  updateGameStoreBoard(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreReviewCommentId: string,
    @Body() updateGameStoreBoardDto: UpdateGameStoreBoardDto,
  ) {
    return this.gameStoreService.updateGameStoreBoard(
      userEmail,
      gameStoreReviewCommentId,
      updateGameStoreBoardDto,
    );
  }

  @Patch('/boards/like')
  updateGameStoreBoardLike(
    @Headers('Authorization') userEmail: string,
    @Query('id') gameStoreBoardId: string,
  ) {
    return this.gameStoreService.updateGameStoreBoardLike(
      gameStoreBoardId,
      userEmail,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameStoreService.remove(+id);
  }
}
