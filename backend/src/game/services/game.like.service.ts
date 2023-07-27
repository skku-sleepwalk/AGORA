import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameLike } from 'src/entites/game.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameLikeService {
  constructor(
    @InjectRepository(GameLike)
    private gameLikeRepository: Repository<GameLike>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameLike(userEmail: string, gameId: string) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    const existingLike = await this.gameLikeRepository.findOne({
      where: { user: { email: userEmail }, game: { id: gameId } },
    });
    if (existingLike) {
      throw new ConflictException('이미 좋아요가 존재합니다.');
    }
    await this.gameLikeRepository.save({ user, game });
    return true;
  }

  async deleteGameLike(userEmail: string, gameId: string) {
    const like = await this.gameLikeRepository.findOne({
      where: { user: { email: userEmail }, game: { id: gameId } },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }
    await this.gameLikeRepository.delete(like);
  }
}
