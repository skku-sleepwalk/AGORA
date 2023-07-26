import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoard } from 'src/entites/game.board.entity';
import { Repository } from 'typeorm';
import { Cursor } from 'typeorm-cursor-pagination';

@Injectable()
export class GameBoardService {
  constructor(
    @InjectRepository(GameBoard)
    private gameBoardRepository: Repository<GameBoard>,
  ) {}

  postGameBoard(
    userEmail: string,
    title: string,
    content: string,
    parentId: string,
    categoryNames: Array<string>,
  ) {
    // 로직 구현
    return;
  }

  getGameBoardByCategory(_cursor: Cursor, categoryNames: Array<string>) {
    // 로직 구현
    return;
  }

  searchGameBoard(
    _cursor: Cursor,
    categoryNames: Array<string>,
    search: string,
  ) {
    // 로직 구현
    return;
  }

  getChild(_cursor: Cursor, parentId: string) {
    // 로직 구현
    return;
  }

  updateGameBoard(
    userEmail: string,
    title: string,
    content: string,
    categoryNames: Array<string>,
  ) {
    // 로직 구현
    return;
  }

  likeGameBoard(userEmail: string, gameBoardId: string) {
    // 로직 구현
    return;
  }

  deleteGameBoard(userEmail: string, gameBoardId: string) {
    // 로직 구현
    return;
  }
}
