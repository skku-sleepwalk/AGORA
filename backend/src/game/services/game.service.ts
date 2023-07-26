import {
  ConflictException,
  ConsoleLogger,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Game } from 'src/entites/game.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { GameStore } from 'src/entites/game.store.entity';
import { GameTag } from 'src/entites/game.tag.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, In, Repository, getManager } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
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
      const newGame = new Game();
      newGame.title = title;
      newGame.downloadUrl = downloadUrl;
      newGame.executablePath = executablePath;
      newGame.author = user; // User 엔티티를 Game의 author로 지정
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

      return newGame;
    } catch (error) {
      // 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 및 쿼리 러너 반환
      await queryRunner.release();
    }
  }

  async getOneGame(gameId: string) {
    return await this.gameRepository.findOne({
      relations: ['popularTags', 'description'],
      where: { id: gameId },
    });
  }

  async updateGame(
    userEmail: string,
    gameId: string,
    downloadUrl: string,
    executablePath: string,
    genreNames: Array<string>,
  ) {
    console.log('email', userEmail, 'gameId', gameId);
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
      console.log('authorId', game.author.id);
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
