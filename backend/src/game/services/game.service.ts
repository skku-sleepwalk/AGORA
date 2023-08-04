import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { GameLike } from 'src/entites/game.like.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameDto } from '../dto/game.dto';
import { GameReview } from 'src/entites/game.review.entity';
import { GameInformation } from 'src/entites/game.information.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameInformation)
    private readonly gameInformationRepository: Repository<GameInformation>,
    @InjectRepository(GameLike)
    private readonly gameLikeRepository: Repository<GameLike>,
    @InjectRepository(GameGenre)
    private readonly gameGenreRepository: Repository<GameGenre>,
    @InjectRepository(GameTagRelation)
    private readonly gameTagRelationRepository: Repository<GameTagRelation>,
    @InjectRepository(GameReview)
    private readonly gameReviewRepository: Repository<GameReview>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  getQueryBuilder() {
    return this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.author', 'author')
      .leftJoinAndSelect('game.store', 'store')
      .leftJoinAndSelect('store.cost', 'cost')
      .leftJoinAndSelect('game.information', 'information');
  }

  calculateRating([reviews, reviewCount]: [Array<GameReview>, number]) {
    return reviews.length > 0
      ? parseFloat(
          (
            reviews
              .map((review) => review.rating)
              .reduce((acc, current) => acc + current, 0) / reviewCount
          ).toFixed(1),
        )
      : 0;
  }

  async gameModifying(userEmail: string, game: GameDto): Promise<GameDto> {
    const [likeRelations, likeCount] =
      await this.gameLikeRepository.findAndCount({
        where: {
          game: {
            id: game.id,
          },
        },
        relations: ['user'],
      });

    // 좋아요 여부에 따라 like 속성 추가
    const like = userEmail
      ? likeRelations.filter((relation) => relation.user.email === userEmail)
          .length > 0
        ? true
        : false
      : false;

    // 별점 확인
    const rating = this.calculateRating(
      await this.gameReviewRepository.findAndCount({
        where: { game: { id: game.id } },
      }),
    );

    // tags 순위 매겨서 5개 반환
    const relations = await this.gameTagRelationRepository.find({
      where: { game: { id: game.id } },
      relations: ['tag'],
    });
    const tagCountMap = new Map<string, number>();

    for (const relation of relations) {
      const tagName = relation.tag.name;
      tagCountMap.set(tagName, (tagCountMap.get(tagName) || 0) + 1);
    }
    const sortedTags = Array.from(tagCountMap.entries()).sort(
      (a, b) => b[1] - a[1],
    );

    const top5Tags = sortedTags.slice(0, 5).map(([tagName]) => tagName);
    const popularTags = top5Tags.map((tagName) => {
      const relation = relations.find((r) => r.tag.name === tagName);
      return relation.tag;
    });

    // game 데이터에 like 속성 추가하여 반환
    return {
      ...game,
      like,
      likeCount,
      rating,
      popularTags,
    };
  }

  async dataModifying(
    userEmail: string,
    data: Array<GameDto>,
  ): Promise<Array<GameDto>> {
    return await Promise.all(
      data.map(async (game) => {
        return this.gameModifying(userEmail, game);
        // userEmail과 game.id를 이용하여 좋아요 여부 조회
      }),
    );
  }

  async postGame(
    userEmail: string,
    title: string,
    downloadUrl: string,
    executablePath: string,
    shortContent: string,
    shortImgUrl: string,
    genreNames: Array<string>,
    description: string,
    specification: string,
    iconUrl: string,
  ) {
    // 트랜잭션 시작
    const queryRunner = this.dataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾기
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. 중복된 title인 게임이 있는지 확인
      const existingGame = await this.gameRepository.findOne({
        where: { title },
      });
      if (existingGame) {
        throw new ConflictException('이미 존재하는 게임 이름입니다.');
      }
      // 3. Game 엔티티 생성 및 저장
      const newGame = this.gameRepository.create({
        title,
        downloadUrl,
        executablePath,
        author: user,
        shortContent,
        shortImgUrl,
        iconUrl,
      });
      queryRunner.manager.save(newGame);

      const newInformation = this.gameInformationRepository.create({
        description,
        specification,
      });
      await queryRunner.manager.save(newInformation);

      newGame.information = newInformation;
      // 4. Genre 엔티티 생성 및 저장 (중복 방지)
      const uniqueGenres: GameGenre[] = [];
      for (const genreName of genreNames) {
        const existingGenre = await this.gameGenreRepository.findOne({
          where: { name: genreName },
        });
        if (existingGenre) {
          uniqueGenres.push(existingGenre);
        }
      }

      // 5. Game과 Genre의 관계 설정
      newGame.genres = uniqueGenres;
      await queryRunner.manager.save(Game, newGame);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 쿼리 러너 반환
      await queryRunner.release();
    }
  }

  async getOneGame(userEmail: string, gameId: string) {
    // gameId에 해당하는 게임 데이터를 조회
    const _game: GameDto = await this.gameRepository.findOne({
      relations: ['information', 'genres', 'author', 'store', 'store.cost'],
      where: { id: gameId },
    });
    if (!_game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    const game = this.gameModifying(userEmail, _game);

    return game;
  }

  async getGameByGenre(userEmail: string, _cursor: Cursor, genreName: string) {
    // 게임 레포지토리에서 genreName에 해당하는 게임을 조회하는 쿼리 빌더 생성
    const queryBuilder = this.getQueryBuilder().where(
      'genres.name = :genreName',
      { genreName },
    );
    // 페이징 옵션 설정
    const paginationOption: PaginationOptions<Game> = {
      entity: Game,
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

    // 페이징을 적용하여 데이터 조회
    const { data, cursor } = await paginator.paginate(queryBuilder);
    // data 배열을 map 메서드를 사용하여 변환
    const dataModified = await this.dataModifying(userEmail, data);
    // 수정된 dataWithLikes와 cursor 반환
    return { data: dataModified, cursor };
    // return { data, cursor };
  }

  async searchGame(
    userEmail: string,
    _cursor: Cursor,
    genreNames: Array<string>,
    search: string,
  ) {
    // 게임 레포지토리에서 genreName에 해당하는 게임을 조회하는 쿼리 빌더 생성
    const queryBuilder = this.getQueryBuilder().where(
      '(genres.name IN (:...genreNames)) AND (game.title LIKE :search OR game.shortContent LIKE :search OR store.title LIKE :search OR description.content LIKE :search)',
      { genreNames, search: `%${search}%` },
    );

    // 페이징 옵션 설정
    const paginationOption: PaginationOptions<Game> = {
      entity: Game,
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
    // 페이징을 적용하여 데이터 조회
    const { data, cursor } = await paginator.paginate(queryBuilder);
    // data 배열을 map 메서드를 사용하여 변환
    const dataModified = await this.dataModifying(userEmail, data);
    // 수정된 data와 cursor 반환
    return { data: dataModified, cursor };
  }

  async updateGame(
    userEmail: string,
    gameId: string,
    downloadUrl: string,
    executablePath: string,
    genreNames: Array<string>,
    description: string,
    specification: string,
    iconUrl: string,
  ) {
    // 트랜잭션 시작
    const queryRunner = this.dataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾기
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
            relations: ['author', 'information'],
          })
        : null;
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 3. 현재 유저가 해당 게임의 작성자인지 확인
      if (game.author.id !== user.id) {
        throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
      }

      const information = {
        ...game.information,
        description,
        specification,
      };

      // 4. Game 엔티티 수정
      game.information = information;
      game.downloadUrl = downloadUrl;
      game.executablePath = executablePath;
      game.iconUrl = iconUrl;
      await queryRunner.manager.save(Game, game);

      // 5. Genre 엔티티 생성 및 저장 (중복 방지)
      const genres: GameGenre[] = [];
      const existingGenres = await this.gameGenreRepository.find({
        where: { name: In(genreNames) },
      });

      for (const genreName of genreNames) {
        const existingGenre = existingGenres.find(
          (genre) => genre.name === genreName,
        );
        if (existingGenre) {
          genres.push(existingGenre);
        }
      }

      // 6. Game과 Genre의 관계 설정
      game.genres = genres;
      await queryRunner.manager.save(Game, game);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 쿼리 러너 반환
      await queryRunner.release();
    }
  }

  async deleteGame(userEmail: string, gameId: string) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = gameId
      ? await this.gameRepository.findOne({
          where: { id: gameId },
          relations: ['author'],
        })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (game.author.id !== user.id) {
      throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
    }

    // 4. 게임 삭제
    await this.gameRepository.delete(gameId);
  }
}
