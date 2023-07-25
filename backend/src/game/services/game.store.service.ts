import { InjectRepository } from '@nestjs/typeorm';
import { GameStore, SNSUrls } from 'src/entites/game.store.entity';
import { DataSource, Repository } from 'typeorm';
import { GameCost } from 'src/entites/game.cost.entity';
import { GameGenre } from 'src/entites/game.genre.entity';
import { User } from 'src/entites/user.entity';
import { Injectable } from '@nestjs/common';
import { Game } from 'src/entites/game.entity';

@Injectable()
export class GameStoresService {
  constructor(
    @InjectRepository(GameStore)
    private gameStoreRepository: Repository<GameStore>,
    @InjectRepository(GameCost)
    private gameCostRepository: Repository<GameCost>,
    @InjectRepository(GameGenre)
    private gameGenreRepository: Repository<GameGenre>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async postGameStore(
    userEmail: string,
    gameId: string,
    title: string,
    shortContent: string,
    shortImgUrl: string,
    cost: GameCost,
    snsUrls: SNSUrls,
    developer: string,
    distributor: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    const { password, ...author }: User = await queryRunner.manager
      .getRepository(User)
      .findOne({
        where: { email: userEmail },
      });
    const game: Game = await queryRunner.manager
      .getRepository(Game)
      .findOne({ where: { id: gameId } });

    try {
      const newGameCost: GameCost = await queryRunner.manager
        .getRepository(GameCost)
        .save(cost);
      const newGameStore: GameStore = await queryRunner.manager
        .getRepository(GameStore)
        .save({
          author,
          title,
          shortContent,
          shortImgUrl,
          snsUrls,
          developer,
          distributor,
          cost: newGameCost,
          price: cost.isFree
            ? 0
            : !cost.isSale
            ? cost.defaultPrice
            : cost.saledPrice,
          game,
        });

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
