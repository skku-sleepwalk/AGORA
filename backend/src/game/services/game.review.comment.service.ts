import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameReviewComment } from 'src/entites/game.review.comment.entity';
import { GameReviewCommentLike } from 'src/entites/game.review.comment.like.entity';
import { GameReview } from 'src/entites/game.review.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameReviewCommentDto } from '../dto/game.review.comment.dto';
import { GameReviewCommentDislike } from 'src/entites/game.review.comment.dislike.entity';

@Injectable()
export class GameReviewCommentService {
  constructor(
    @InjectRepository(GameReviewComment)
    private gameReviewCommentRepository: Repository<GameReviewComment>,
    @InjectRepository(GameReviewCommentLike)
    private gameReviewCommentLikeRepository: Repository<GameReviewCommentLike>,
    @InjectRepository(GameReviewCommentDislike)
    private gameReviewCommentDislikeRepository: Repository<GameReviewCommentDislike>,
    @InjectRepository(GameReview)
    private gameReviewRepository: Repository<GameReview>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 게임 리뷰 댓글을 가공하여 반환하는 메서드
  async commentModifying(
    userEmail: string,
    comment: GameReviewCommentDto,
  ): Promise<GameReviewCommentDto> {
    // userEmail과 gameReview.id를 이용하여 좋아요 여부 조회
    const [likes, likeCount] = await this.gameReviewCommentLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.commentId =:commentId', {
        userEmail,
        commentId: comment.id,
      })
      .getManyAndCount();
    const [dislikes, dislikeCount] =
      await this.gameReviewCommentDislikeRepository
        .createQueryBuilder('relation')
        .leftJoinAndSelect('relation.user', 'user')
        .where('relation.commentId =:commentId', {
          userEmail,
          commentId: comment.id,
        })
        .getManyAndCount();

    const like =
      likes.filter((relation) => relation.user.email === userEmail).length > 0
        ? true
        : false;
    const dislike =
      dislikes.filter((relation) => relation.user.email === userEmail).length >
      0
        ? true
        : false;

    return { ...comment, like, dislike, likeCount, dislikeCount };
  }

  // 게임 리뷰 댓글 리스트를 가공하여 반환하는 메서드
  async dataModifying(
    userEmail: string,
    data: Array<GameReviewCommentDto>,
  ): Promise<Array<GameReviewCommentDto>> {
    return await Promise.all(
      data.map(async (review) => {
        return await this.commentModifying(userEmail, review);
      }),
    );
  }

  // 게임 리뷰에 댓글을 작성하는 메서드
  async postGameReviewComment(
    userEmail: string,
    gameId: string,
    reviewId: string,
    content: string,
  ) {
    // 1. User 엔티티를 userEmail로 찾기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. GameReview 엔티티를 reviewId로 찾기
    const review = reviewId
      ? await this.gameReviewRepository.findOne({
          where: { id: reviewId },
        })
      : null;
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    // 3. GameReviewComment 엔티티 생성 및 저장
    const newGameReview = this.gameReviewCommentRepository.create({
      content,
      review,
      author: user,
    });
    await this.gameReviewCommentRepository.save(newGameReview);

    return true;
  }

  // 게임 리뷰에 속한 댓글 리스트를 페이징 처리하여 반환하는 메서드
  async getManyGameReviewComment(
    userEmail: string,
    _cursor: Cursor,
    gameId: string,
    reviewId: string,
  ) {
    // gameReviewComment 레포지토리에서 gameReviewId에 해당하는 게임을 조회하는 쿼리 빌더 생성
    const queryBuilder = this.gameReviewCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.reviewId = :reviewId', { reviewId });
    // 페이징 옵션 설정
    const paginationOption: PaginationOptions<GameReviewComment> = {
      entity: GameReviewComment,
      paginationKeys: ['createdAt'],
      query: {
        afterCursor: _cursor.afterCursor || null,
        beforeCursor: _cursor.beforeCursor || null,
        limit: 5,
        order: 'DESC',
      },
    };
    // 페이징 처리를 위한 Paginator 생성
    const paginator = buildPaginator(paginationOption);
    paginator.setAlias('comment');
    // 페이징을 적용하여 데이터 조회
    const { data, cursor } = await paginator.paginate(queryBuilder);
    // data 배열을 map 메서드를 사용하여 변환
    const dataModified = await this.dataModifying(userEmail, data);

    return { data: dataModified, cursor };
  }

  // 게임 리뷰 댓글을 수정하는 메서드
  async updateGameReviewComment(
    userEmail: string,
    gameId: string,
    reviewId: string,
    commentId: string,
    content: string,
  ) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. GameReviewComment 엔티티를 commentId로 찾기
    const comment = commentId
      ? await this.gameReviewCommentRepository.findOne({
          where: {
            id: commentId,
            review: { id: reviewId, game: { id: gameId } },
          },
        })
      : null;
    if (!comment) {
      throw new NotFoundException('리뷰 댓글을 찾을 수 없습니다.');
    }

    // 3. 리뷰 댓글 수정 및 저장
    comment.content = content;
    this.gameReviewCommentRepository.save(comment);

    return true;
  }

  // 게임 리뷰 댓글을 삭제하는 메서드
  async deleteGameReviewComment(
    userEmail: string,
    gameId: string,
    reviewId: string,
    commentId: string,
  ) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 리뷰 댓글 엔티티 가져오기
    const comment = commentId
      ? await this.gameReviewCommentRepository.findOne({
          where: {
            id: commentId,
            review: { id: reviewId, game: { id: gameId } },
          },
        })
      : null;
    if (!comment) {
      throw new NotFoundException('리뷰 댓글을 찾을 수 없습니다.');
    }

    // 3. 리뷰 댓글 삭제
    await this.gameReviewCommentRepository.delete(comment.id);
    return;
  }
}
