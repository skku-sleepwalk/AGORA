import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReviewDislike } from 'src/entites/asset/asset.review.dislike.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetReviewDislikeService {
  constructor(
    @InjectRepository(AssetReviewDislike)
    private readonly assetReviewDislikeRepository: Repository<AssetReviewDislike>,
    @InjectRepository(AssetReview)
    private readonly assetReviewRepository: Repository<AssetReview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async dislikeAssetReview(
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

    const dislike = await this.assetReviewDislikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
        reviewId: review.id,
      })
      .getOne();
    if (dislike) {
      throw new ConflictException('이미 싫어요를 누른 리뷰입니다.');
    }

    const newDislike = this.assetReviewDislikeRepository.create({
      user,
      review,
    });
    await this.assetReviewDislikeRepository.save(newDislike);
    return true;
  }

  async deleteAssetReviewDislike(
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

    const dislike = await this.assetReviewDislikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
        reviewId: review.id,
      })
      .getOne();
    if (!dislike) {
      throw new NotFoundException('싫어요를 누르지 않은 리뷰입니다.');
    }

    await this.assetReviewDislikeRepository.delete(dislike.id);
    return true;
  }
}
