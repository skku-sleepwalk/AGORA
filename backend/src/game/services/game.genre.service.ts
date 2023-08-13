import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameGenre } from 'src/entites/game/game.genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameGenreService {
  constructor(
    @InjectRepository(GameGenre)
    private readonly gameGenreRepository: Repository<GameGenre>,
  ) {}

  async postGameGenre(name: string) {
    const existGenre = await this.gameGenreRepository
      .createQueryBuilder('genre')
      .where('genre.name = :name', { name })
      .getOne();
    if (existGenre) {
      throw new ConflictException('이미 존재하는 장르입니다.');
    }
    this.gameGenreRepository.save({ name });
    return true;
  }
}
