import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameInformation } from 'src/entites/game.information.entity';
import { Game } from 'src/entites/game.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameInformationService {
  constructor(
    @InjectRepository(GameInformation)
    private gameInformationRepository: Repository<GameInformation>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async postGameInformation(
    userEmail: string,
    gameId: string,
    description: string,
    specification: string,
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

    const information = this.gameInformationRepository.create({
      game,
      description,
      specification,
    });
    return this.gameInformationRepository.save(information);
  }

  async patchGameInformation(
    userEmail: string,
    GameInformationId: string,
    description: string,
    specification: string,
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

    // 2. GameInfomration 엔티티를 gameId로 찾기
    const gameInformation = GameInformationId
      ? await this.gameInformationRepository.findOne({
          where: { id: GameInformationId },
          relations: ['game'],
        })
      : null;
    if (!GameInformation) {
      throw new NotFoundException('게임 설명을 찾을 수 없습니다.');
    }

    // 3. 현재 유저가 해당 게임의 작성자인지 확인
    if (gameInformation.game.author.id !== user.id) {
      throw new ForbiddenException('해당 게임의 작성자가 아닙니다.');
    }

    // 4. GameInformation 엔티티 수정
    gameInformation.description = description;
    gameInformation.specification = specification;
    await this.gameInformationRepository.save(gameInformation);
  }
}
