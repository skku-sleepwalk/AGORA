import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReview } from 'src/entites/game.review.entity';
import { GameReviewDislike } from 'src/entites/game.review.dislike.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameReviewDislikeService {
  constructor(
    @InjectRepository(GameReviewDislike)
    private gameReviewDislikeRepository: Repository<GameReviewDislike>,
    @InjectRepository(GameReview)
    private gameReviewRepository: Repository<GameReview>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameReviewDislike(
    userEmail: string,
    gameId: string,
    reviewId: string,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const review = reviewId
      ? await this.gameReviewRepository.findOne({
          where: { id: reviewId, game: { id: gameId } },
        })
      : null;
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const existingDislike = await this.gameReviewDislikeRepository.findOne({
      where: {
        id: reviewId,
        user: { email: userEmail },
        review: { game: { id: gameId } },
      },
    });
    if (existingDislike) {
      throw new ConflictException('이미 싫어요가 존재합니다.');
    }
    await this.gameReviewDislikeRepository.save({ user, review });
    return true;
  }

  async deleteGameReviewDislike(
    userEmail: string,
    gameId: string,
    reviewId: string,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const review = reviewId
      ? await this.gameReviewRepository.findOne({
          where: { id: reviewId, game: { id: gameId } },
        })
      : null;
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const dislike = await this.gameReviewDislikeRepository.findOne({
      where: {
        id: reviewId,
        user: { email: userEmail },
        review: { game: { id: gameId } },
      },
    });
    if (!dislike) {
      throw new NotFoundException('싫어요를 찾을 수 없습니다.');
    }
    await this.gameReviewDislikeRepository.delete(dislike.id);
  }
}