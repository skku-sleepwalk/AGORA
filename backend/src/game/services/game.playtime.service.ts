import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game/game.entity';
import { PlayTime } from 'src/entites/game/game.playtime.entity';
import { User } from 'src/entites/user.entity';
import { UserSubscribe } from 'src/entites/user.subscribe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamePlaytimeService {
  constructor(
    @InjectRepository(PlayTime)
    private readonly playtimeRepository: Repository<PlayTime>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserSubscribe)
    private readonly userSubUserSubscribeRepository: Repository<UserSubscribe>,
  ) {}

  async updatePlaytime(
    userEmail: string,
    gameId: string,
    additionalPlaytime: number,
  ) {
    // 유저 검증
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 게임 검증
    const game = gameId
      ? await this.gameRepository.findOne({ where: { id: gameId } })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 구독 검증
    const userSubscribe = await this.userSubUserSubscribeRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!userSubscribe) {
      throw new NotFoundException('구독 정보를 찾을 수 없습니다.');
    }

    // 진여 시간 업데이트
    await this.userSubUserSubscribeRepository.save({
      remainPlayTime: userSubscribe.remainPlayTime - additionalPlaytime,
      ...userSubscribe,
    });

    // 플레이 시간 업데이트
    const playtime = await this.playtimeRepository.findOne({
      where: { game: { id: gameId }, user: { id: user.id } },
    });
    if (!playtime) {
      await this.playtimeRepository.save({
        game,
        user,
        playtime: additionalPlaytime,
      });
    } else {
      await this.playtimeRepository.save({
        ...playtime,
        playtime: playtime.playtime + additionalPlaytime,
      });
    }
  }
}
