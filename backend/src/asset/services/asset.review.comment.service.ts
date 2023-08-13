import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetReviewComment } from 'src/entites/asset/asset.review.comment.entity';
import { AssetReview } from 'src/entites/asset/asset.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { AssetReviewCommentDto } from '../dto/asset.review.comment.dto';
import { AssetReviewCommentLike } from 'src/entites/asset/asset.review.comment.like.entity';
import { AssetReviewCommentDislike } from 'src/entites/asset/asset.review.comment.dislike.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';

@Injectable()
export class AssetReviewCommentService {
  constructor(
    @InjectRepository(AssetReviewComment)
    private readonly assetReviewCommentRepository: Repository<AssetReviewComment>,
    @InjectRepository(AssetReview)
    private readonly assetReviewRepository: Repository<AssetReview>,
    @InjectRepository(AssetReviewCommentLike)
    private readonly assetReviewCommentLikeRepository: Repository<AssetReviewCommentLike>,
    @InjectRepository(AssetReviewCommentDislike)
    private readonly assetReviewCommentDislikeRepository: Repository<AssetReviewCommentDislike>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async commentModifying(
    userEmail: string,
    comment: AssetReviewComment,
  ): Promise<AssetReviewCommentDto> {
    const [likes, likeCount] = await this.assetReviewCommentLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.commentId =:commentId', {
        commentId: comment.id,
      })
      .getManyAndCount();
    const [dislikes, dislikeCount] =
      await this.assetReviewCommentDislikeRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.user', 'user')
        .where('relation.commentId =:commentId', {
          commentId: comment.id,
        })
        .getManyAndCount();

    const like = likes.some((relation) => relation.user.email === userEmail);
    const dislike = dislikes.some(
      (relation) => relation.user.email === userEmail,
    );

    return {
      ...comment,
      likeCount,
      dislikeCount,
      like,
      dislike,
    };
  }

  async dataModifying(
    userEmail: string,
    data: AssetReviewComment[],
  ): Promise<AssetReviewCommentDto[]> {
    return await Promise.all(
      data.map(async (comment) => {
        return await this.commentModifying(userEmail, comment);
      }),
    );
  }

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

  async getAssetReviewComments(
    userEmail: string,
    _cursor: Cursor,
    assetId: string,
    reviewId: string,
  ) {
    const review = await this.assetReviewRepository
      .createQueryBuilder('review')
      .where('review.id =:reviewId', { reviewId })
      .getOne();
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    const queryBuilder = this.assetReviewCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.reviewId =:reviewId', { reviewId });

    const paginationOption: PaginationOptions<AssetReviewComment> = {
      entity: AssetReviewComment,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 5,
        order: 'DESC',
      },
    };

    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('comment');

    const { data, cursor } = await paginator.paginate(queryBuilder);
    const dataModified = await this.dataModifying(userEmail, data);

    return {
      data: dataModified,
      cursor,
    };
  }

  async updateAssetReviewComment(
    userEmail: string,
    assetId: string,
    reviewId: string,
    commentId: string,
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

    const comment = await this.assetReviewCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.id =:commentId', { commentId })
      .getOne();
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (comment.author.id !== user.id) {
      throw new ForbiddenException('댓글을 수정할 권한이 없습니다.');
    }

    comment.content = content;
    await this.assetReviewCommentRepository.save(comment);
    return true;
  }

  async deleteAssetReviewComment(
    userEmail: string,
    assetId: string,
    reviewId: string,
    commentId: string,
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

    const comment = await this.assetReviewCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.id =:commentId', { commentId })
      .getOne();
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (comment.author.id !== user.id) {
      throw new NotFoundException('댓글을 삭제할 권한이 없습니다.');
    }

    await this.assetReviewCommentRepository.delete(comment.id);
    return true;
  }
}
