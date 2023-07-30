import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoardCategory } from 'src/entites/game.board.category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameBoardCategoryService {
  constructor(
    @InjectRepository(GameBoardCategory)
    private gameBoardCategoryRepository: Repository<GameBoardCategory>,
  ) {}

  postGameBoardCategory(name: string) {
    this.gameBoardCategoryRepository.save({ name });
    return;
  }
}
