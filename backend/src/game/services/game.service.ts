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
import { GameTag } from 'src/entites/game.tag.entity';
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

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameLike)
    private readonly gameLikeRepository: Repository<GameLike>,
    @InjectRepository(GameGenre)
    private readonly gameGenreRepository: Repository<GameGenre>,
    @InjectRepository(GameTag)
    private readonly gameTagRepository: Repository<GameTag>,
    @InjectRepository(GameTagRelation)
    private readonly gameTagRelationRepository: Repository<GameTagRelation>,
    @InjectRepository(GameReview)
    private readonly gameReviewRepository: Repository<GameReview>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

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

    // 별점 체크
    const rating = this.calculateRating(
      await this.gameReviewRepository.findAndCount({
        where: { game: { id: game.id } },
      }),
    );

    // game 데이터에 like 속성 추가하여 반환
    return {
      ...game,
      like,
      likeCount,
      rating,
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
  ) {
    // 트랜잭션 시작
    const queryRunner =
      this.gameRepository.manager.connection.createQueryRunner();
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
      });

      // 4. Genre 엔티티 생성 및 저장 (중복 방지)
      const uniqueGenres: GameGenre[] = [];
      for (const genreName of genreNames) {
        const existingGenre = await this.gameGenreRepository.findOne({
          where: { name: genreName },
        });
        if (existingGenre) {
          uniqueGenres.push(existingGenre);
        } else {
          const newGenre = new GameGenre();
          newGenre.name = genreName;
          const savedGenre = await queryRunner.manager.save(
            GameGenre,
            newGenre,
          );
          uniqueGenres.push(savedGenre);
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
      relations: ['popularTags', 'description', 'genres', 'author'],
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
    const queryBuilder = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.author', 'author')
      .leftJoinAndSelect('game.store', 'store')
      .leftJoinAndSelect('game.description', 'description')
      .where('genres.name = :genreName', { genreName });
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
    const queryBuilder = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.author', 'author')
      .leftJoinAndSelect('game.store', 'store')
      .leftJoinAndSelect('game.description', 'description')
      .where(
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
  ) {
    // 트랜잭션 시작
    const queryRunner =
      this.gameRepository.manager.connection.createQueryRunner();
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

      // 4. Game 엔티티 수정
      game.downloadUrl = downloadUrl;
      game.executablePath = executablePath;
      await queryRunner.manager.save(Game, game);

      // 5. Genre 엔티티 생성 및 저장 (중복 방지)
      const uniqueGenres: GameGenre[] = [];
      const existingGenres = await this.gameGenreRepository.find({
        where: { name: In(genreNames) },
      });

      for (const genreName of genreNames) {
        const existingGenre = existingGenres.find(
          (genre) => genre.name === genreName,
        );
        if (existingGenre) {
          uniqueGenres.push(existingGenre);
        } else {
          const newGenre = new GameGenre();
          newGenre.name = genreName;
          const savedGenre = await queryRunner.manager.save(
            GameGenre,
            newGenre,
          );
          uniqueGenres.push(savedGenre);
        }
      }

      // 6. Game과 Genre의 관계 설정
      game.genres = uniqueGenres;
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
