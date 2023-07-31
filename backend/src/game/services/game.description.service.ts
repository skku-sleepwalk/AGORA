import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameDescription } from 'src/entites/game.description.entity';
import { Game } from 'src/entites/game.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameDescriptionService {
  constructor(
    @InjectRepository(GameDescription)
    private gameDescriptionRepository: Repository<GameDescription>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameDescription(
    userEmail: string,
    gameId: string,
    content: string,
  ) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const game = userEmail
      ? await this.gameRepository.findOne({ where: { id: gameId } })
      : null;
    if (!user) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    const description = this.gameDescriptionRepository.create({
      game,
      content,
    });
    return this.gameDescriptionRepository.save(description);
  }

  async patchGameDescription(
    userEmail: string,
    gameDescriptionId: string,
    content: string,
  ) {
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
    const gameDescription = gameDescriptionId
      ? await this.gameDescriptionRepository.findOne({
          where: { id: gameDescriptionId },
          relations: ['game'],
        })
      : null;
    if (!gameDescription) {
      throw new NotFoundException('게임 설명을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (gameDescription.game.author.id !== user.id) {
      throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
    }

    // 4. GameDescription 엔티티 수정
    gameDescription.content = content;
    await this.gameDescriptionRepository.save(gameDescription);
  }
}
