import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { GameLikeRelation } from 'src/entites/game.like.relation.entity';
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

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameLikeRelation)
    private readonly gameLikeRelationRepository: Repository<GameLikeRelation>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(GameGenre)
    private readonly gameGenreRepository: Repository<GameGenre>,
    @InjectRepository(GameTag)
    private readonly gameTagRepository: Repository<GameTag>,
    @InjectRepository(GameTagRelation)
    private readonly gameTagRelationRepository: Repository<GameTagRelation>,

    private dataSource: DataSource,
  ) {}

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
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
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
      await queryRunner.manager.save(Game, newGame);

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

      // return newGame;
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
    const game: GameDto = await this.gameRepository.findOne({
      relations: ['popularTags', 'description', 'genres'],
      where: { id: gameId },
    });
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 게임에 대한 좋아요 관계 및 좋아요 개수를 조회
    const [likeRelation, likeCount] =
      await this.gameLikeRelationRepository.findAndCount({
        where: {
          game: { id: game.id },
        },
        relations: ['user'],
      });

    // userEmail을 기준으로 좋아요 여부를 판별하여 game 객체에 like 속성 추가
    game.like =
      likeRelation.filter((game) => game.user.email === userEmail).length > 0
        ? true
        : false;

    // game 객체에 좋아요 개수를 추가
    game.likeCount = likeCount;

    return game;
  }

  async getGameByGenre(userEmail: string, _cursor: Cursor, genreName: string) {
    // 게임 레포지토리에서 genreName에 해당하는 게임을 조회하는 쿼리 빌더 생성
    const queryBuilder = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.genres', 'genres')
      .leftJoinAndSelect('game.store', 'store')
      .where('genres.name = :genreName', { genreName });
    console.log(await queryBuilder.getMany());
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
    const dataWithLikes = await Promise.all(
      data.map(async (game) => {
        // userEmail과 game.id를 이용하여 좋아요 여부 조회
        const [likeRelations, likeCount] =
          await this.gameLikeRelationRepository.findAndCount({
            where: {
              likeAction: 'like',
              game: {
                id: game.id,
              },
            },
            relations: ['user'],
          });

        // 좋아요 여부에 따라 like 속성 추가
        const like =
          likeRelations.filter((relation) => relation.user.email === userEmail)
            .length > 0
            ? true
            : false;

        // game 데이터에 like 속성 추가하여 반환
        return {
          ...game,
          like,
          likeCount,
        };
      }),
    );

    // 수정된 dataWithLikes와 cursor 반환
    return { data: dataWithLikes, cursor };
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
    const dataWithLikes = await Promise.all(
      data.map(async (game) => {
        // userEmail과 game.id를 이용하여 좋아요 여부 조회
        const [likeRelations, likeCount] =
          await this.gameLikeRelationRepository.findAndCount({
            where: {
              likeAction: 'like',
              game: {
                id: game.id,
              },
            },
          });

        // 좋아요 여부에 따라 like 속성 추가
        const like =
          likeRelations.filter((relation) => relation.user.email === userEmail)
            .length > 0
            ? true
            : false;

        // game 데이터에 like 속성 추가하여 반환
        return {
          ...game,
          like,
          likeCount,
        };
      }),
    );
    // 수정된 dataWithLikes와 cursor 반환
    return { data: dataWithLikes, cursor };
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
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. Game 엔티티를 gameId로 찾기
      const game = await this.gameRepository.findOne({
        where: { id: gameId },
        relations: ['author'],
      });
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

  async likeGame(userEmail: string, gameId: string) {
    const queryRunner =
      this.gameRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. User 엔티티를 userEmail로 찾기
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 2. Game 엔티티를 gameId로 찾기
      const game = await this.gameRepository.findOne({
        where: { id: gameId },
        relations: ['author'],
      });
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 3. Relation 존재하는지 확인
      const existingRelation = await this.gameLikeRelationRepository.findOne({
        where: { game: { id: game.id }, user: { id: user.id } },
      });
      // 3.1. 존재하지 않는다면 새로운 relation 생성
      if (!existingRelation) {
        const newRelation = this.gameLikeRelationRepository.create({
          game,
          user,
          likeAction: 'like',
        });
        queryRunner.manager.save(GameLikeRelation, newRelation);
      } else {
        // 3.2. 존재한다면 기존 relation 토글
        existingRelation.likeAction =
          existingRelation.likeAction === 'like' ? null : 'like';
        queryRunner.manager.save(GameLikeRelation, existingRelation);
      }

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

  async updateGameTagRelation(
    userEmail: string,
    gameId: string,
    tagNames: Array<string>,
  ) {
    // 1. 태그와 게임 엔티티들 가져오기
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['tags', 'tagRelations', 'tagRelations.tag'],
    });
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 2. 현재 유저 가져오기
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 3. 태그 엔티티들 가져오기 (없는 태그라면 에러 발생)
    const tags = await this.gameTagRepository.find({
      where: { name: In(tagNames) },
    });
    const foundTagNames = tags.map((tag) => tag.name);
    const missingTags = tagNames.filter(
      (tagName) => !foundTagNames.includes(tagName),
    );
    if (missingTags.length > 0) {
      throw new NotFoundException(
        `태그를 찾을 수 없습니다: ${missingTags.join(', ')}`,
      );
    }

    // 4. GameTagRelation 테이블 업데이트
    const existingRelations = game.tagRelations;
    const existingTagNames = existingRelations.map(
      (relation) => relation.tag.name,
    );

    // 4.1 관계 삭제
    const relationsToDelete = existingRelations.filter(
      (relation) => !tagNames.includes(relation.tag.name),
    );
    await this.gameTagRelationRepository.remove(relationsToDelete);

    // 4.2 새로 추가되는 관계
    const newRelations = tags
      .filter((tag) => !existingTagNames.includes(tag.name))
      .map((tag) => {
        const newRelation = new GameTagRelation();
        newRelation.game = game;
        newRelation.tag = tag;
        newRelation.user = user;
        return newRelation;
      });

    // 관계 저장
    await this.gameTagRelationRepository.save(newRelations);

    return game;
  }

  async deleteGame(userEmail: string, gameId: string) {
    // 1. 현재 유저 가져오기
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['author'],
    });
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (game.author.id !== user.id) {
      throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
    }

    // 4. 게임 삭제
    await this.gameRepository.softDelete(gameId);

    return true;
  }
}
