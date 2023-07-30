import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameGenre } from 'src/entites/game.genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameGenreService {
  constructor(
    @InjectRepository(GameGenre)
    private readonly gameGenreRepository: Repository<GameGenre>,
  ) {}

  postGameGenre(name: string) {
    this.gameGenreRepository.save({ name });
    return true;
  }
}
