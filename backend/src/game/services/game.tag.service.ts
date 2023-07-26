import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameTag } from 'src/entites/game.tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameTagService {
  constructor(
    @InjectRepository(GameTag)
    private gameTagRepository: Repository<GameTag>,
  ) {}

  postGameTag(name: string) {
    this.gameTagRepository.save({ name });
  }

  async searchGameTag(search: string) {
    return await this.gameTagRepository
      .createQueryBuilder('tag')
      .where('tag.name LIKE :search', { search })
      .getMany();
  }
}
