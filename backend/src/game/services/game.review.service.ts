import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameReview } from 'src/entites/game.review.entity';
import { GameReviewLike } from 'src/entites/game.review.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameReviewDto } from '../dto/game.review.dto';
import { GameReviewDislike } from 'src/entites/game.review.dislike.entity';

@Injectable()
export class GameReviewService {
  constructor(
    @InjectRepository(GameReview)
    private readonly gameReviewRepository: Repository<GameReview>,
    @InjectRepository(GameReviewLike)
    private readonly gameReviewLikeRepository: Repository<GameReviewLike>,
    @InjectRepository(GameReviewDislike)
    private readonly gameReviewDislikeRepository: Repository<GameReviewDislike>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async reviewModifying(
    userEmail: string,
    review: GameReviewDto,
  ): Promise<GameReviewDto> {
    // userEmail과 gameReview.id를 이용하여 좋아요 여부 조회
    const [likes, likeCount] = await this.gameReviewLikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
        reviewId: review.id,
      })
      .getManyAndCount();

    const [dislikes, dislikeCount] = await this.gameReviewDislikeRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.reviewId =:reviewId', {
        userEmail,
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

    return { ...review, like, dislike, likeCount, dislikeCount };
  }

  async dataModifying(
    userEmail: string,
    data: Array<GameReviewDto>,
  ): Promise<Array<GameReviewDto>> {
    return await Promise.all(
      data.map(async (review) => {
        return await this.reviewModifying(userEmail, review);
      }),
    );
  }

  async postGameReview(
    userEmail: string,
    gameId: string,
    content: string,
    rating: number,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. Game 엔티티를 gameId로 찾기
    const game = gameId
      ? await this.gameRepository.findOne({
          where: { id: gameId },
          relations: ['author'],
        })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 3. 유저의 게임에 대한 리뷰 존재하는지 확인
    const existingReview = await this.gameReviewRepository.findOne({
      where: { author: { id: user.id }, game: { id: game.id } },
    });
    if (existingReview) {
      throw new ConflictException('이미 리뷰를 작성한 게임입니다.');
    }

    // 4. GameReview 엔티티 생성 및 저장
    const newGameReview = this.gameReviewRepository.create({
      content,
      rating,
      author: user,
      game,
    });
    await this.gameReviewRepository.save(newGameReview);

    return true;
  }

  async getOneGameReviewByUser(
    userEmail: string,
    gameId: string,
  ): Promise<GameReviewDto> {
    if (!userEmail) {
      return null;
    }
    const _review: GameReviewDto = await this.gameReviewRepository.findOne({
      where: { game: { id: gameId }, author: { email: userEmail } },
      relations: ['author'],
    });
    const review = await this.reviewModifying(userEmail, _review);
    return review || null;
  }

  async getOneGameReview(
    userEmail: string,
    gameId: string,
    reviewId: string,
  ): Promise<GameReviewDto> {
    const _review: GameReviewDto = await this.gameReviewRepository.findOne({
      where: { id: reviewId, game: { id: gameId } },
    });
    if (!_review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }
    const review = await this.reviewModifying(userEmail, _review);
    return review;
  }

  async getManyGameReview(userEmail: string, _cursor: Cursor, gameId: string) {
    // gameReview 레포지토리에서 gameId에 해당하는 게임을 조회하는 쿼리 빌더 생성
    const queryBuilder = this.gameReviewRepository
      .createQueryBuilder('review')
      .where('review.gameId = :gameId', { gameId });
    // 페이징 옵션 설정
    const paginationOption: PaginationOptions<GameReview> = {
      entity: GameReview,
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
    paginator.setAlias('review');
    // 페이징을 적용하여 데이터 조회
    const { data, cursor } = await paginator.paginate(queryBuilder);
    // data 배열을 map 메서드를 사용하여 변환
    const dataModified = await this.dataModifying(userEmail, data);

    return { data: dataModified, cursor };
  }

  async updateGameReview(
    userEmail: string,
    gameId: string,
    content: string,
    rating: number,
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

    // 2. GameReview 엔티티를 gameId로 찾기
    const review = gameId
      ? await this.gameReviewRepository.findOne({
          where: { game: { id: gameId } },
          relations: ['author'],
        })
      : null;
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 리뷰의 작성자인지 확인
    if (review.author.id !== user.id) {
      throw new ForbiddenException('해당 리뷰의 작성자가 아닙니다.');
    }
    // 4. GameReview 엔티티 수정
    review.content = content;
    review.rating = rating;
    await this.gameReviewRepository.save(review);
    return true;
  }

  async deleteGameReview(userEmail: string, gameId: string, reviewId: string) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 리뷰 엔티티 가져오기
    const review = reviewId
      ? await this.gameReviewRepository.findOne({
          where: { id: reviewId, game: { id: gameId } },
          relations: ['author'],
        })
      : null;
    if (!review) {
      throw new NotFoundException('리뷰를 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 리뷰의 작성자인지 확인
    if (review.author.id !== user.id) {
      throw new ForbiddenException('해당 리뷰의 작성자가 아닙니다.');
    }

    // 4. 리뷰 삭제
    await this.gameRepository.delete(review.id);

    return true;
  }
}
