import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeAction } from 'src/common/types/likeAction.type';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';
import { Repository } from 'typeorm';
import { Cursor } from 'typeorm-cursor-pagination';

@Injectable()
export class GameReviewCommentService {
  constructor(
    @InjectRepository(GameReviewComment)
    private gameReviewCommentRepository: Repository<GameReviewComment>,
  ) {}

  postGameReviewComment(userEmail: string, reviewId: string, content: string) {
    // 로직 구현
    return;
  }

  getManyGameReviewComment(_cursor: Cursor, gameReviewId: string) {
    // 로직 구현
    return;
  }

  updateGameReviewComment(
    userEmail: string,
    gameReviewCommentId: string,
    content: string,
  ) {
    // 로직 구현
    return;
  }

  likeGameReviewComment(
    userEmail: string,
    gameReviewCommentId: string,
    likeAction: LikeAction,
  ) {
    // 로직 구현
    return;
  }

  deleteGameReviewComment(userEmail: string, gameReviewCommentId: string) {
    // 로직 구현
    return;
  }
}
