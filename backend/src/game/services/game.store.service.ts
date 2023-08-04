import { InjectRepository } from '@nestjs/typeorm';
import { GameStore, SNSUrls } from 'src/entites/game/game.store.entity';
import { DataSource, Repository } from 'typeorm';
import { GameCost } from 'src/entites/game/game.cost.entity';
import { User } from 'src/entites/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from 'src/entites/game/game.entity';
import { GameStoreDto } from '../dto/game.store.dto';
import { GameCostDto } from '../dto/game.cost.dto';
import { GameLike } from 'src/entites/game/game.like.entity';

@Injectable()
export class GameStoreService {
  constructor(
    // GameStore, Game, GameLike, GameCost, User 엔티티의 Repository 주입
    @InjectRepository(GameStore)
    private readonly gameStoreRepository: Repository<GameStore>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameLike)
    private readonly gameLikeRepository: Repository<GameLike>,
    @InjectRepository(GameCost)
    private readonly gameCostRepository: Repository<GameCost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // 데이터베이스 연결을 위한 DataSource 주입
    private readonly dataSource: DataSource,
  ) {}

  // 게임 스토어를 추가하는 메서드
  async postGameStore(
    userEmail: string,
    gameId: string,
    title: string,
    cost: GameCost,
    snsUrls: SNSUrls,
    developer: string,
    distributor: string,
    imgUrls: Array<string>,
  ) {
    // 1. Transaction 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. 유저 가져오기
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      // 3. 게임 엔티티 가져오기
      const game = gameId
        ? await this.gameRepository.findOne({ where: { id: gameId } })
        : null;
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      // 4. 게임 엔티티와 관련된 GameStore가 이미 존재하는지 확인
      const existingGameStore = await this.gameStoreRepository.findOne({
        where: { game: { id: gameId } },
      });
      if (existingGameStore) {
        throw new NotFoundException('해당 게임의 스토어가 이미 존재합니다.');
      }

      // 5. GameCost 엔티티 저장
      const newGameCost = this.gameCostRepository.create(cost);
      const savedCost = await queryRunner.manager.save(newGameCost);

      // 6. GameStore 엔티티 생성 및 저장
      const newGameStore = this.gameStoreRepository.create({
        title,
        snsUrls,
        developer,
        distributor,
        cost: savedCost,
        game,
        author: user,
        imgUrls,
      });
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

  // 특정 게임의 스토어 정보를 조회하는 메서드
  async getGameStore(userEmail: string, gameId: string) {
    // GameStore 엔티티와 관련된 정보를 조회
    const gameStore: GameStoreDto = await this.gameStoreRepository.findOne({
      where: { game: { id: gameId } },
      relations: ['cost'],
    });
    // 게임의 좋아요 여부와 좋아요 수를 조회하여 GameStoreDto에 추가
    const [relations, likeCount] = await this.gameLikeRepository.findAndCount({
      where: { game: { id: gameId } },
      relations: ['user'],
    });
    gameStore.like =
      relations.filter((relation) => relation.user.email === userEmail).length >
      0
        ? true
        : false;
    gameStore.likeCount = likeCount;
    return gameStore;
  }

  // 게임 스토어 정보를 업데이트하는 메서드
  async updateGameStore(
    userEmail: string,
    gameId: string,
    cost: GameCostDto,
    developer: string,
    distributor: string,
    snsUrls: SNSUrls,
    title: string,
    imgUrls: Array<string>,
  ) {
    // 1. Transaction 시작
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. 유저 가져오기
      const user = userEmail
        ? await this.userRepository.findOne({
            where: { email: userEmail },
          })
        : null;
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }
      // 3. GameStore 엔티티 가져오기
      const gameStore = gameId
        ? await this.gameStoreRepository.findOne({
            where: { game: { id: gameId } },
            relations: ['cost'],
          })
        : null;
      if (!gameStore) {
        throw new NotFoundException('게임 스토어를 찾을 수 없습니다.');
      }

      // 4. GameStore 엔티티 수정 및 저장
      gameStore.developer = developer;
      gameStore.distributor = distributor;
      gameStore.developer = developer;
      gameStore.snsUrls = snsUrls;
      gameStore.title = title;
      gameStore.imgUrls = imgUrls;
      await queryRunner.manager.save(GameStore, gameStore);

      // 5. GameCost 엔티티 수정 및 저장
      cost.id = gameStore.cost.id;
      await queryRunner.manager.save(GameCost, cost);

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
}
