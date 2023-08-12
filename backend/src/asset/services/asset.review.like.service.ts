import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { AssetReviewLike } from 'src/entites/asset/asset.review.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetReviewLikeService {
  constructor(
    @InjectRepository(AssetReviewLike)
    private readonly assetReviewLikeRepository: Repository<AssetReviewLike>,
    @InjectRepository(AssetReview)
    private readonly assetReviewRepository: Repository<AssetReview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async likeAssetReview(userEmail: string, assetId: string, reviewId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email =:email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .where('review.id =:reviewId', { reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const like = await this.assetReviewLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
        reviewId: review.id,
      })
      .getOne();
    if (like) {
      throw new NotFoundException('이미 좋아요를 누른 리뷰입니다.');
    }

    const newLike = this.assetReviewLikeRepository.create({
      user,
      review,
    });
    await this.assetReviewLikeRepository.save(newLike);
    return true;
  }

  async deleteAssetReviewLike(
    userEmail: string,
    assetId: string,
    reviewId: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email =:email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .where('review.id =:reviewId', { reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const like = await this.assetReviewLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
        reviewId: review.id,
      })
      .getOne();
    if (!like) {
      throw new NotFoundException('좋아요를 누르지 않은 리뷰입니다.');
    }

    await this.assetReviewLikeRepository.delete(like.id);
    return true;
  }
}
