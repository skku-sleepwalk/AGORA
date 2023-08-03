import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoard } from 'src/entites/game.board.entity';
import { GameBoardLike } from 'src/entites/game.board.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameBoardLikeService {
  constructor(
    @InjectRepository(GameBoardLike)
    private readonly gameBoardLikeRepository: Repository<GameBoardLike>,
    @InjectRepository(GameBoard)
    private readonly gameBoardRepository: Repository<GameBoard>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async postGameBoardLike(userEmail: string, gameId: string, boardId: string) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const board = boardId
      ? await this.gameBoardRepository.findOne({
          where: { id: boardId, game: { id: gameId } },
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const existingLike = await this.gameBoardLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        board: { id: boardId, game: { id: gameId } },
      },
    });
    if (existingLike) {
      throw new ConflictException('이미 좋아요가 존재합니다.');
    }
    await this.gameBoardLikeRepository.save({ user, board });
    return true;
  }

  async deleteGameBoardLike(
    userEmail: string,
    gameId: string,
    boardId: string,
  ) {
    const like = await this.gameBoardLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        board: { id: boardId, game: { id: gameId } },
      },
    });
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const board = boardId
      ? await this.gameBoardRepository.findOne({
          where: { id: boardId },
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }
    await this.gameBoardLikeRepository.delete(like.id);
  }
}
