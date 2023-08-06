import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReviewCommentDislike } from 'src/entites/game/game.review.comment.dislike.entity';
import { GameReviewComment } from 'src/entites/game/game.review.comment.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameReviewCommentDislikeService {
  constructor(
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

    const existingDislike =
      await this.gameReviewCommentDislikeRepository.findOne({
        where: {
          id: gameReviewCommentId,
          user: { email: userEmail },
          comment: {
            id: gameReviewCommentId,
            review: { id: gameReviewId, game: { id: gameId } },
          },
        },
      });
    if (existingDislike) {
      throw new ConflictException('이미 싫어요가 존재합니다.');
    }
    await this.gameReviewCommentDislikeRepository.save({ user, comment });
    return true;
  }

  async deleteGameReviewCommentDislike(
    userEmail: string,
    gameId: string,
    gameReviewId: string,
    gameReviewCommentId: string,
  ) {
    const dislike = await this.gameReviewCommentDislikeRepository.findOne({
      where: {
        id: gameReviewCommentId,
        comment: {
          id: gameReviewId,
          review: { id: gameReviewId, game: { id: gameId } },
        },
        user: { email: userEmail },
      },
    });
    if (!dislike) {
      throw new NotFoundException('싫어요를 찾을 수 없습니다.');
    }
    await this.gameReviewCommentDislikeRepository.delete(dislike.id);
  }
}
