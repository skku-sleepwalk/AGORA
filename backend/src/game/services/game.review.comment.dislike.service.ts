import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReviewCommentDislike } from 'src/entites/game/game.review.comment.dislike.entity';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GameReviewCommentDislikeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(GameReviewCommentDislike)
    private readonly gameReviewCommentDislikeRepository: Repository<GameReviewCommentDislike>,
    @InjectRepository(GameReviewComment)
    private readonly gameReviewCommentRepository: Repository<GameReviewComment>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameReviewCommentDislike(
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

    const comment = gameReviewCommentId
      ? await this.gameReviewCommentRepository.findOne({
          where: {
            id: gameReviewCommentId,
            review: { id: gameReviewId, game: { id: gameId } },
          },
        })
      : null;
    if (!comment) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingLike =
        await this.gameReviewCommentDislikeRepository.findOne({
          where: {
            user: { email: userEmail },
            comment: {
              id: gameReviewCommentId,
              review: { id: gameReviewId, game: { id: gameId } },
            },
          },
        });
      if (existingLike) {
        throw new ConflictException('이미 싫어요가 존재합니다.');
      }
      await queryRunner.manager.save(GameReviewCommentDislike, {
        user,
        comment,
      });
      await queryRunner.manager.decrement(
        GameReviewComment,
        {
          id: gameReviewCommentId,
          review: { id: gameReviewId, game: { id: gameId } },
        },
        'dislikeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteGameReviewCommentDislike(
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

    const comment = gameReviewCommentId
      ? await this.gameReviewCommentRepository.findOne({
          where: {
            id: gameReviewCommentId,
            review: { id: gameReviewId, game: { id: gameId } },
          },
        })
      : null;
    if (!comment) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingLike =
        await this.gameReviewCommentDislikeRepository.findOne({
          where: {
            user: { email: userEmail },
            comment: {
              id: gameReviewCommentId,
              review: { id: gameReviewId, game: { id: gameId } },
            },
          },
        });
      if (!existingLike) {
        throw new ConflictException('싫어요를 누르지 않은 리뷰입니다.');
      }
      await queryRunner.manager.decrement(
        GameReviewComment,
        {
          id: gameReviewCommentId,
          review: { id: gameReviewId, game: { id: gameId } },
        },
        'dislikeCount',
        1,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
