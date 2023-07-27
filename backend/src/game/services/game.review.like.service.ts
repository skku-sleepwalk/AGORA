import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReview } from 'src/entites/game.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { GameReviewLike } from 'src/entites/game.review.like.entity';

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
    gameReviewId: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const review = await this.gameReviewRepository.findOne({
      where: { id: gameReviewId, game: { id: gameId } },
    });
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const existingLike = await this.gameReviewLikeRepository.findOne({
      where: {
        id: gameReviewId,
        user: { email: userEmail },
        review: { game: { id: gameId } },
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
    gameReviewId: string,
  ) {
    const like = await this.gameReviewLikeRepository.findOne({
      where: {
        id: gameReviewId,
        user: { email: userEmail },
        review: { game: { id: gameId } },
      },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }
    await this.gameReviewLikeRepository.delete(like);
  }
}
