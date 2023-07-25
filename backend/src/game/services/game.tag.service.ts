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
    return;
  }
}
