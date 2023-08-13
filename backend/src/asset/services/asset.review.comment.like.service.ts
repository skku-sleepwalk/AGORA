import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReviewCommentLike } from 'src/entites/asset/asset.review.comment.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetReviewCommentLikeService {
  constructor(
    @InjectRepository(AssetReviewCommentLike)
    private readonly assetReviewCommentLikeRepository: Repository<AssetReviewCommentLike>,
    @InjectRepository(AssetReviewComment)
    private readonly assetReviewCommentRepository: Repository<AssetReviewComment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 댓글에 대한 좋아요 메서드
  async createLike(
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
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    const like = await this.assetReviewCommentLikeRepository
      .createQueryBuilder('like')
      .where('like.user = :userId', { userId: user.id })
      .andWhere('like.commentId = :commentId', { commentId: comment.id })
      .getOne();

    if (like) {
      throw new ConflictException('이미 좋아요를 누른 댓글입니다.');
    }

    const newLike = this.assetReviewCommentLikeRepository.create({
      user,
      comment,
    });
    await this.assetReviewCommentLikeRepository.save(newLike);
    return true;
  }

  // 댓글에 대한 좋아요 취소 메서드
  async deleteLike(
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
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    const like = await this.assetReviewCommentLikeRepository
      .createQueryBuilder('like')
      .where('like.user = :userId', { userId: user.id })
      .andWhere('like.commentId = :commentId', { commentId: comment.id })
      .getOne();

    if (!like) {
      throw new ConflictException('좋아요를 누르지 않은 댓글입니다.');
    }

    await this.assetReviewCommentLikeRepository.delete(like.id);
    return true;
  }
}
