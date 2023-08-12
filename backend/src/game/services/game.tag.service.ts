import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTag } from 'src/entites/game/game.tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameTagService {
  constructor(
    @InjectRepository(GameTag)
    private gameTagRepository: Repository<GameTag>,
  ) {}

  async postGameTag(name: string) {
    const existTag = await this.gameTagRepository
      .createQueryBuilder('tag')
      .where('tag.name = :name', { name })
      .getOne();
    if (existTag) {
      throw new ConflictException('이미 존재하는 태그입니다.');
    }
    this.gameTagRepository.save({ name });
  }

  async searchGameTag(search: string) {
    return await this.gameTagRepository
      .createQueryBuilder('tag')
      .where('tag.name LIKE :search', { search: `%${search}%` })
      .getMany();
  }
}
