import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReview } from 'src/entites/game/game.review.entity';
import { GameReviewDislike } from 'src/entites/game/game.review.dislike.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GameReviewDislikeService {
  constructor(
    private readonly dataSource: DataSource,
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingLike = await this.gameReviewDislikeRepository.findOne({
        where: {
          user: { email: userEmail },
          review: { id: reviewId },
        },
      });
      if (existingLike) {
        throw new ConflictException('이미 싫어요가 존재합니다.');
      }
      await queryRunner.manager.save(GameReviewDislike, { user, review });
      await queryRunner.manager.increment(
        GameReview,
        { id: reviewId },
        'dislikeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingLike = await this.gameReviewDislikeRepository.findOne({
        where: {
          user: { email: userEmail },
          review: { id: reviewId, game: { id: gameId } },
        },
      });
      if (!existingLike) {
        throw new NotFoundException('싫어요를 찾을 수 없습니다.');
      }
      await queryRunner.manager.decrement(
        GameReview,
        { id: reviewId },
        'dislikeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    const dislike = await this.gameReviewDislikeRepository.findOne({
      where: {
        user: { email: userEmail },
        review: { id: reviewId, game: { id: gameId } },
      },
    });
    if (!dislike) {
      throw new NotFoundException('싫어요를 찾을 수 없습니다.');
    }
    await this.gameReviewDislikeRepository.delete(dislike.id);
  }
}
