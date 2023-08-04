import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';
import { GameReviewCommentLike } from 'src/entites/game/game.review.comment.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameReviewCommentLikeService {
  constructor(
    @InjectRepository(GameReviewCommentLike)
    private readonly gameReviewCommentLikeRepository: Repository<GameReviewCommentLike>,
    @InjectRepository(GameReviewComment)
    private readonly gameReviewCommentRepository: Repository<GameReviewComment>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameReviewCommentLike(
    userEmail: string,
    gameId: string,
    gameReviewId: string,
    gameReviewCommentId: string,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const reviewComment = gameReviewCommentId
      ? await this.gameReviewCommentRepository.findOne({
          where: {
            id: gameReviewCommentId,
            review: { id: gameReviewId, game: { id: gameId } },
          },
        })
      : null;
    if (!reviewComment) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const existingLike = await this.gameReviewCommentLikeRepository.findOne({
      where: {
        id: gameReviewCommentId,
        user: { email: userEmail },
        comment: {
          id: gameReviewCommentId,
          review: { id: gameReviewId, game: { id: gameId } },
        },
      },
    });
    if (existingLike) {
      throw new ConflictException('이미 좋아요가 존재합니다.');
    }
    await this.gameReviewCommentLikeRepository.save({ user, reviewComment });
    return true;
  }

  async deleteGameReviewCommentLike(
    userEmail: string,
    gameId: string,
    gameReviewId: string,
    gameReviewCommentId: string,
  ) {
    const like = await this.gameReviewCommentLikeRepository.findOne({
      where: {
        id: gameReviewCommentId,
        comment: {
          id: gameReviewId,
          review: { id: gameReviewId, game: { id: gameId } },
        },
        user: { email: userEmail },
      },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }
    await this.gameReviewCommentLikeRepository.delete(like.id);
  }
}
