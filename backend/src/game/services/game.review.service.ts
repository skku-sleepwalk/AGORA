import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeAction } from 'src/common/types/likeAction.type';
import { GameReview } from 'src/entites/game.review.entity';
import { Repository } from 'typeorm';
import { Cursor } from 'typeorm-cursor-pagination';

@Injectable()
export class GameReviewService {
  constructor(
    @InjectRepository(GameReview)
    private gameReviewRepository: Repository<GameReview>,
  ) {}

  postGameReview(
    userEmail: string,
    gameStoreId: string,
    content: string,
    rating: number,
  ) {
    // 로직 구현
    return;
  }

  getOneGameReview(gameStoreId: string, gameReviewId: string) {
    // 로직 구현
    return;
  }

  getManyGameReview(_cusror: Cursor, gameStoreId: string) {
    // 로직 구현
    return;
  }

  updateGameReview(
    userEmail: string,
    gameReviewId: string,
    content: string,
    rating: number,
  ) {
    // 로직 구현
    return;
  }

  likeGameReview(
    userEmail: string,
    gameReviewId: string,
    likeAction: LikeAction,
  ) {
    // 로직 구현
    return;
  }

  deleteGameReview(userEmail: string, gameReviewId: string) {
    // 로직 구현
    return;
  }
}
