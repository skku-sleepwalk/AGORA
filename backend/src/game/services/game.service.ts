import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game/game.entity';
import { GameGenre } from 'src/entites/game/game.genre.entity';
import { GameLike } from 'src/entites/game/game.like.entity';
import { GameTagRelation } from 'src/entites/game/game.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameDto } from '../dto/game.dto';
import { GameReview } from 'src/entites/game/game.review.entity';
import { GameInformation } from 'src/entites/game/game.information.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
// NestJS에서 사용되는 각종 데코레이터 및 필요한 모듈들을 import합니다.
// Injectable 데코레이터를 통해 이 서비스가 주입 가능한 클래스임을 선언합니다.
// @InjectRepository를 통해 TypeORM에서 사용할 Repository를 주입합니다.
// 기타 필요한 엔티티들과 Paginator를 사용하기 위한 설정 등이 import됩니다.

@Injectable()
export class GameService {
  // 각 Repository와 DataSource를 주입받습니다.
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
    @InjectRepository(UserSubscribe)
    private readonly userSubscribeRepository: Repository<UserSubscribe>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  // QueryBuilder를 반환하는 메서드입니다.
  // 게임과 관련된 여러 테이블을 Join하여 데이터 조회에 사용됩니다.
  getQueryBuilder() {
    return this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.author', 'author')
      .leftJoinAndSelect('game.store', 'store')
      .leftJoinAndSelect('store.cost', 'cost')
      .leftJoinAndSelect('game.information', 'information');
  }

  // 리뷰 정보를 받아와 평균 별점을 계산하는 메서드입니다.
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

  // 사용자가 좋아요를 누른 게임인지 확인하고, 별점과 인기 태그를 계산하여 게임 데이터에 추가하는 메서드입니다.
  async gameModifying(userEmail: string, game: GameDto): Promise<GameDto> {
    // 게임에 대한 좋아요 정보를 가져옵니다.
    const [likeRelations, likeCount] =
      await this.gameLikeRepository.findAndCount({
        where: {
          game: {
            id: game.id,
          },
        },
        relations: ['user'],
      });

    // 좋아요 여부에 따라 like 속성을 추가합니다.
    const like = userEmail
      ? likeRelations.filter((relation) => relation.user.email === userEmail)
          .length > 0
      : false;

    // 별점 확인
    const rating = this.calculateRating(
      await this.gameReviewRepository.findAndCount({
        where: { game: { id: game.id } },
      }),
    );

    // 게임과 관련된 태그들의 인기도를 계산하여 상위 5개 태그를 가져옵니다.
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

    const isPlayable =
      (await this.userSubscribeRepository
        .createQueryBuilder('userSubscribe')
        .leftJoinAndSelect('userSubscribe.user', 'user')
        .where('user.email = :userEmail', { userEmail })
        .getCount()) > 0;

    // game 데이터에 like 속성과 관련된 정보들을 추가하여 반환합니다.
    return {
      ...game,
      like,
      likeCount,
      rating,
      popularTags,
    };
  }

  // 게임 데이터 배열을 받아 각 게임에 대해 좋아요 여부와 평균 별점 등의 정보를 계산하여 수정된 배열로 반환하는 메서드입니다.
  async dataModifying(
    userEmail: string,
    data: Array<GameDto>,
  ): Promise<Array<GameDto>> {
    return await Promise.all(
      data.map(async (game) => {
        return this.gameModifying(userEmail, game);
      }),
    );
  }

  // 게임 정보를 받아와서 게임을 등록하는 메서드입니다.
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
    // 트랜잭션을 시작합니다.
    const queryRunner = this.dataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾아옵니다.
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. 중복된 title인 게임이 있는지 확인합니다.
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

      // GameInformation 엔티티 생성 및 저장
      const newInformation = this.gameInformationRepository.create({
        description,
        specification,
      });
      await queryRunner.manager.save(newInformation);

      // Game과 GameInformation 관계 설정
      newGame.information = newInformation;
      await queryRunner.manager.save(Game, newGame);

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

  // 특정 게임의 상세 정보를 조회하는 메서드입니다.
  async getOneGame(userEmail: string, gameId: string) {
    // gameId에 해당하는 게임 데이터를 조회
    const _game: GameDto = await this.gameRepository.findOne({
      relations: ['information', 'genres', 'author', 'store', 'store.cost'],
      where: { id: gameId },
    });
    if (!_game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 게임 데이터를 수정하여 반환합니다.
    const game = this.gameModifying(userEmail, _game);

    return game;
  }

  // 특정 장르에 속하는 게임 목록을 조회하는 메서드입니다.
  async getGameByGenre(userEmail: string, _cursor: Cursor, genreName: string) {
    // 게임 레포지토리에서 genreName에 해당하는 게임을 조회하는 쿼리 빌더를 생성합니다.
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

    // 페이징 처리를 위한 Paginator를 생성합니다.
    const paginator = buildPaginator(paginationOption);

    // 페이징을 적용하여 데이터 조회합니다.
    const { data, cursor } = await paginator.paginate(queryBuilder);

    // 조회된 데이터를 가공하여 수정된 데이터와 cursor를 반환합니다.
    const dataModified = await this.dataModifying(userEmail, data);
    return { data: dataModified, cursor };
  }

  // 게임을 검색하는 메서드입니다.
  async searchGame(
    userEmail: string,
    _cursor: Cursor,
    genreNames: Array<string>,
    search: string,
  ) {
    // 게임 레포지토리에서 genreName에 해당하는 게임을 조회하는 쿼리 빌더를 생성합니다.
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

    // 페이징 처리를 위한 Paginator를 생성합니다.
    const paginator = buildPaginator(paginationOption);

    // 페이징을 적용하여 데이터 조회합니다.
    const { data, cursor } = await paginator.paginate(queryBuilder);

    // 조회된 데이터를 가공하여 수정된 데이터와 cursor를 반환합니다.
    const dataModified = await this.dataModifying(userEmail, data);
    return { data: dataModified, cursor };
  }

  // 게임 정보를 업데이트하는 메서드입니다.
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
    // 트랜잭션을 시작합니다.
    const queryRunner = this.dataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾아옵니다.
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. Game 엔티티를 gameId로 찾아옵니다.
      const game = gameId
        ? await this.gameRepository.findOne({
            where: { id: gameId },
            relations: ['author', 'information'],
          })
        : null;
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 3. 현재 유저가 해당 게임의 작성자인지 확인합니다.
      if (game.author.id !== user.id) {
        throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
      }

      // 4. Game 엔티티 수정
      const information = {
        ...game.information,
        description,
        specification,
      };
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

  // 게임을 삭제하는 메서드입니다.
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
