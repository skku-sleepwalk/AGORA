import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game.entity';
import { GameTagRelation } from 'src/entites/game.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameTagRelationService {
  constructor(
    @InjectRepository(GameTagRelation)
    private readonly gameTagRelationRepository: Repository<GameTagRelation>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async postGameTagRelation(
    userEmail: string,
    gameId: string,
    tagName: string,
  ) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = gameId
      ? await this.gameRepository.findOne({
          where: { id: gameId },
        })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    this.gameTagRelationRepository.save({ user, game, name: tagName });
    return true;
  }

  async getGameTagRelation(userEmail: string, gameId: string) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = gameId
      ? await this.gameRepository.findOne({
          where: { id: gameId },
        })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    const relations = await this.gameTagRelationRepository.find({
      where: { game: { id: game.id }, user: { id: user.id } },
      relations: ['tag'],
    });
    return relations;
  }

  async deleteGameTagRelation(
    userEmail: string,
    gameId: string,
    relationId: string,
  ) {
    // 1. 현재 유저 가져오기
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = gameId
      ? await this.gameRepository.findOne({
          where: { id: gameId },
        })
      : null;
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 2. GameTagRelation 엔티티 가져오기
    const relation = await this.gameTagRelationRepository.findOne({
      where: {
        id: relationId,
        game: { id: gameId },
        user: { email: userEmail },
      },
    });
    if (!relation) {
      throw new NotFoundException('관계를 찾을 수 없습니다.');
    }

    this.gameTagRelationRepository.delete(relation);
  }
}
