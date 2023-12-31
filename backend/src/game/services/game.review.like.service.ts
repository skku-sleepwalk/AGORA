import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReview } from 'src/entites/game/game.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { GameReviewLike } from 'src/entites/game/game.review.like.entity';

@Injectable()
export class GameReviewLikeService {
  constructor(
    @InjectRepository(GameReviewLike)
    private gameReviewLikeRepository: Repository<GameReviewLike>,
    @InjectRepository(GameReview)
    private gameReviewRepository: Repository<GameReview>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameReviewLike(
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

    const existingLike = await this.gameReviewLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        review: { id: reviewId },
      },
    });
    if (existingLike) {
      throw new ConflictException('이미 좋아요가 존재합니다.');
    }
    await this.gameReviewLikeRepository.save({ user, review });
    return true;
  }

  async deleteGameReviewLike(
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

    const like = await this.gameReviewLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        review: { id: reviewId },
      },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }
    await this.gameReviewLikeRepository.delete(like.id);
  }
}
