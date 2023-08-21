import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entites/asset/asset.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { AssetReviewDto } from '../dto/asset.review.dto';
import { AssetReviewLike } from 'src/entites/asset/asset.review.like.entity';
import { AssetReviewDislike } from 'src/entites/asset/asset.review.dislike.entity';

@Injectable()
export class AssetReviewService {
  constructor(
    @InjectRepository(AssetReview)
    private readonly assetReviewRepository: Repository<AssetReview>,
    @InjectRepository(AssetReviewLike)
    private readonly assetReviewLikeRepository: Repository<AssetReviewLike>,
    @InjectRepository(AssetReviewDislike)
    private readonly assetReviewDislikeRepository: Repository<AssetReviewDislike>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 리뷰에 대한 좋아요, 싫어요 여부와 플레이타임 정보를 포함하여 리뷰 정보를 수정하는 메서드
  async reviewModifying(
    userEmail: string,
    review: AssetReview,
  ): Promise<AssetReviewDto> {
    if (!review) {
      return null;
    }
    const [likes, likeCount] = await this.assetReviewLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        reviewId: review.id,
      })
      .getManyAndCount();

    const [dislikes, dislikeCount] = await this.assetReviewDislikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        reviewId: review.id,
      })
      .getManyAndCount();

    const like = userEmail
      ? likes.filter((relation) => relation.user.email === userEmail).length > 0
        ? true
        : false
      : false;
    const dislike = userEmail
      ? dislikes.filter((relation) => relation.user.email === userEmail)
          .length > 0
        ? true
        : false
      : false;

    return {
      ...review,
      like,
      dislike,
      likeCount,
      dislikeCount,
    };
  }

  // 리뷰 배열에 대해 reviewModifying 메서드를 적용하여 변경된 리뷰 배열을 반환하는 메서드
  async dataModifying(
    userEmail: string,
    data: Array<AssetReview>,
  ): Promise<Array<AssetReviewDto>> {
    return await Promise.all(
      data.map(async (review) => {
        return await this.reviewModifying(userEmail, review);
      }),
    );
  }

  async createAssetReview(
    userEmail: string,
    assetId: string,
    content: string,
    rating: number,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const existingAssetReview = await this.assetReviewRepository
      .createQueryBuilder('review')
      .where('review.authorId = :userId', { userId: user.id })
      .andWhere('review.assetId = :assetId', { assetId: assetId })
      .getOne();
    if (existingAssetReview) {
      throw new ConflictException('이미 리뷰를 작성했습니다.');
    }

    const assetReview = this.assetReviewRepository.create({
      content,
      rating,
      asset,
      author: user,
    });

    await this.assetReviewRepository.save(assetReview);
    return true;
  }

  async getAssetReviews(userEmail: string, assetId: string, _cursor: Cursor) {
    const queryBuilder = this.assetReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.assetId = :assetId', { assetId: assetId });

    const paginationOption: PaginationOptions<AssetReview> = {
      entity: AssetReview,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 5,
        order: 'DESC',
      },
    };
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('review');

    const { data, cursor } = await paginator.paginate(queryBuilder);
    const dataModified = await this.dataModifying(userEmail, data);
    return { data: dataModified, cursor };
  }

  async getAssetReview(userEmail: string, assetId: string, reviewId: string) {
    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.id = :id', { id: reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }
    const reviewModified = await this.reviewModifying(userEmail, review);
    return reviewModified;
  }

  async getAssetReviewByUser(userEmail: string, assetId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: userEmail,
      })
      .getOne();
    if (!user) {
      return null;
    }

    const asset = this.assetRepository
      .createQueryBuilder('asset')
      .leftJoinAndSelect('asset.author', 'author')
      .where('asset.id = :assetId', { assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.authorId = :userId', { userId: user.id })
      .andWhere('review.assetId = :assetId', { assetId })
      .getOne();
    if (!review) {
      return null;
    }
    return this.reviewModifying(userEmail, review);
  }

  async updateAssetReview(
    userEmail: string,
    assetId: string,
    reviewId: string,
    content: string,
    rating: number,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }
    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.id = :id', { id: reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    if (review.author.id !== user.id) {
      throw new ForbiddenException('리뷰를 수정할 권한이 없습니다.');
    }

    review.content = content;
    review.rating = rating;
    await this.assetReviewRepository.save(review);
    return true;
  }

  async deleteAssetReview(
    userEmail: string,
    assetId: string,
    reviewId: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const asset = await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.id = :id', { id: assetId })
      .getOne();
    if (!asset) {
      throw new NotFoundException('에셋을 찾을 수 없습니다.');
    }

    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.author', 'author')
      .where('review.id = :id', { id: reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    if (review.author.id !== user.id) {
      throw new ForbiddenException('리뷰를 삭제할 권한이 없습니다.');
    }

    await this.assetReviewRepository.delete(review.id);
    return true;
  }
}
