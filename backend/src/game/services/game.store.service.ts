import { InjectRepository } from '@nestjs/typeorm';
import { GameStore, SNSUrls } from 'src/entites/game.store.entity';
import { DataSource, Repository } from 'typeorm';
import { GameCost } from 'src/entites/game.cost.entity';
import { User } from 'src/entites/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from 'src/entites/game.entity';
import {
  Cursor,
  PaginationOptions,
  buildPaginator,
} from 'typeorm-cursor-pagination';
import { GameStoreDto } from '../dto/game.store.dto';
import Paginator from 'typeorm-cursor-pagination/lib/Paginator';

@Injectable()
export class GameStoresService {
  constructor(
    @InjectRepository(GameStore)
    private gameStoreRepository: Repository<GameStore>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameCost)
    private gameCostRepository: Repository<GameCost>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async postGameStore(
    userEmail: string,
    gameId: string,
    title: string,
    cost: GameCost,
    snsUrls: SNSUrls,
    developer: string,
    distributor: string,
  ) {
    // 1. Transaction 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. 현재 유저 가져오기
      const user = await this.userRepository.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 3. 게임 엔티티 가져오기
      const game = await this.gameRepository.findOne({ where: { id: gameId } });
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 4. 게임 엔티티와 관련된 GameStore가 이미 존재하는지 확인
      const existingGameStore = await this.gameStoreRepository.findOne({
        where: { game },
      });
      if (existingGameStore) {
        throw new NotFoundException('해당 게임의 스토어가 이미 존재합니다.');
      }

      // 5. GameCost 엔티티 저장
      const newGameCost = this.gameCostRepository.create(cost);
      const savedCost = await queryRunner.manager.save(newGameCost);

      // 6. GameStore 엔티티 생성 및 저장
      const newGameStore = new GameStore();
      newGameStore.title = title;
      newGameStore.snsUrls = snsUrls;
      newGameStore.developer = developer;
      newGameStore.distributor = distributor;
      newGameStore.price = savedCost.isFree
        ? 0
        : !savedCost.isSale
        ? savedCost.defaultPrice
        : savedCost.saledPrice;
      newGameStore.cost = savedCost;
      newGameStore.game = game;
      newGameStore.author = user;
      await queryRunner.manager.save(newGameStore);

      // 7. Transaction 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 8. Transaction 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 9. Transaction 종료 및 리소스 반환
      await queryRunner.release();
    }
  }

  async getGameStore(userEmail: string, gameStoreId: string) {
    const gameStore: GameStoreDto = await this.gameStoreRepository.findOne({
      where: { id: gameStoreId },
      relations: ['cost'],
    });
    console.log(gameStore);

    return gameStore;
  }

  searchGameStore(_cursor: Cursor, genreNames: Array<string>, search: string) {
    //구현
  }

  updateGameStore(userEmail: string, gameStoreId: string) {
    return;
  }

  likeGameStore(userEmail) {
    return;
  }
  deleteGameStore() {
    return;
  }
}
