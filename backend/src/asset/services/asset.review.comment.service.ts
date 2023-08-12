import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetReviewCommentService {
  constructor(
    @InjectRepository(AssetReviewComment)
    private readonly assetReviewCommentRepository: Repository<AssetReviewComment>,
    @InjectRepository(AssetReview)
    private readonly assetReviewRepository: Repository<AssetReview>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createAssetReviewComment(
    userEmail: string,
    assetId: string,
    reviewId: string,
    content: string,
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

    const newComment = this.assetReviewCommentRepository.create({
      author: user,
      review,
      content,
    });
    await this.assetReviewCommentRepository.save(newComment);
    return true;
  }
}
