import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entites/game/game.entity';
import { GameTag } from 'src/entites/game/game.tag.entity';
import { GameTagRelation } from 'src/entites/game/game.tag.relation.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameTagRelationService {
  constructor(
    @InjectRepository(GameTagRelation)
    private readonly gameTagRelationRepository: Repository<GameTagRelation>,
    @InjectRepository(GameTag)
    private readonly gameTagRepository: Repository<GameTag>,
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

    // 3. 게임 태그 엔티티 가져오기
    const tag = await this.gameTagRepository
      .createQueryBuilder('tag')
      .where('tag.name = :name', { name: tagName })
      .getOne();
    if (!tag) {
      throw new NotFoundException('게임 태그를 찾을 수 없습니다.');
    }

    // 4. 이미 존재하는 게임 태그 관계인지 확인
    const existRelation = await this.gameTagRelationRepository
      .createQueryBuilder('relation')
      .where('relation.user = :user', { user: user.id })
      .andWhere('relation.game = :game', { game: game.id })
      .andWhere('relation.tag = :tag', { tag: tag.id })
      .getOne();
    if (existRelation) {
      throw new ConflictException('이미 존재하는 게임 태그 관계입니다.');
    }
    // 4. 게임 태그 관계 엔티티 생성
    const tagRelation = await this.gameTagRelationRepository.save({
      user,
      game,
      tag,
    });
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
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userEmail })
      .getOne();
    console.log(user);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 게임 엔티티 가져오기
    const game = await this.gameRepository
      .createQueryBuilder('game')
      .where('game.id = :id', { id: gameId })
      .getOne();
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    // 2. GameTagRelation 엔티티 가져오기
    const relation = await this.gameTagRelationRepository
      .createQueryBuilder('relation')
      .where('relation.id = :id', { id: relationId })
      .getOne();
    console.log(relation);
    if (!relation) {
      throw new NotFoundException('관계를 찾을 수 없습니다.');
    }

    await this.gameTagRelationRepository.delete(relation.id);
    return true;
  }
}
