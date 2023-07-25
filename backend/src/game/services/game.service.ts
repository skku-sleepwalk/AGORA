import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { User } from 'src/entites/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private dataSource: DataSource,
  ) {}

  async postGame(
    userEmail: string,
    title: string,
    downloadUrl: string,
    executablePath: string,
    genreNames: Array<string>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    const { password, ...author }: User = await queryRunner.manager
      .getRepository(User)
      .findOne({
        where: { email: userEmail },
      });
    try {
      const newGame: Game = await queryRunner.manager
        .getRepository(Game)
        .save({ title, author, downloadUrl, executablePath });

      const promises = Object.keys(genreNames).map(async (genreName) => {
        const genre = await queryRunner.manager
          .getRepository(GameGenre)
          .findOne({
            where: {
              name: genreName,
            },
          });
        if (!genre) {
          return await queryRunner.manager
            .getRepository(GameGenre)
            .save({ name: genreName });
        } else {
          return genre;
        }
      });

      const Genres: GameGenre[] = await Promise.all(promises);
      newGame.genres.push(...Genres);
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
