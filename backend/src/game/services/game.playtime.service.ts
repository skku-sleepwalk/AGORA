import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { PlayTime } from 'src/entites/game.playtime.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamePlaytimeService {
  constructor(
    @InjectRepository(PlayTime)
    private readonly playtimeRepository: Repository<PlayTime>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updatePlaytime(
    userEmail: string,
    gameId: string,
    additionalPlaytime: number,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const game = gameId
      ? await this.gameRepository.findOne({ where: { id: gameId } })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    const playtime = await this.playtimeRepository.findOne({
      where: { game: { id: gameId }, user: { id: user.id } },
    });
    if (!playtime) {
      this.playtimeRepository.save({
        game,
        user,
        playtime: additionalPlaytime,
      });
    } else {
      this.playtimeRepository.save({
        ...playtime,
        playtime: playtime.playtime + additionalPlaytime,
      });
    }
  }
}
