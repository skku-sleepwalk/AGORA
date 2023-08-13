import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReviewCommentDislike } from 'src/entites/asset/asset.review.comment.dislike.entity';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetReviewCommentDislikeService {
  constructor(
    @InjectRepository(AssetReviewCommentDislike)
    private readonly assetReviewCommentDislikeRepository: Repository<AssetReviewCommentDislike>,
    @InjectRepository(AssetReviewComment)
    private readonly assetReviewCommentRepository: Repository<AssetReviewComment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 댓글에 대한 싫어요 메서드
  async createDislike(
    userEmail: string,
    assetId: string,
    reviewId: string,
    commentId: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :userEmail', { userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const comment = await this.assetReviewCommentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :commentId', {
        commentId,
      })
      .getOne();
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    const dislike = await this.assetReviewCommentDislikeRepository
      .createQueryBuilder('dislike')
      .where('dislike.user = :userId', { userId: user.id })
      .andWhere('dislike.commentId = :commentId', { commentId: comment.id })
      .getOne();

    if (dislike) {
      throw new ConflictException('이미 싫어요를 누른 댓글입니다.');
    }

    const newDislike = this.assetReviewCommentDislikeRepository.create({
      user,
      comment,
    });
    await this.assetReviewCommentDislikeRepository.save(newDislike);
    return true;
  }

  // 댓글에 대한 싫어요 취소 메서드
  async deleteDislike(
    userEmail: string,
    assetId: string,
    reviewId: string,
    commentId: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :userEmail', { userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const comment = await this.assetReviewCommentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :commentId', {
        commentId,
      })
      .getOne();
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    const dislike = await this.assetReviewCommentDislikeRepository
      .createQueryBuilder('dislike')
      .where('dislike.user = :userId', { userId: user.id })
      .andWhere('dislike.commentId = :commentId', { commentId: comment.id })
      .getOne();

    if (!dislike) {
      throw new ConflictException('싫어요를 누르지 않은 댓글입니다.');
    }

    await this.assetReviewCommentDislikeRepository.delete(dislike.id);
    return true;
  }
}
