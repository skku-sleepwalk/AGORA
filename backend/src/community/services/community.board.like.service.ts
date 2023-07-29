import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityBoard } from 'src/entites/community.board.entity';
import { CommunityBoardLike } from 'src/entites/community.board.like.entity';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityBoardLikeService {
  constructor(
    @InjectRepository(CommunityBoardLike)
    private readonly communityBoardLikeRepository: Repository<CommunityBoardLike>,
    @InjectRepository(CommunityBoard)
    private readonly communityBoardRepository: Repository<CommunityBoard>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async postGameBoardLike(userEmail: string, boardId: string) {
    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const board = boardId
      ? await this.communityBoardRepository.findOne({
          where: { id: boardId },
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const existingLike = await this.communityBoardLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        board: { id: boardId },
      },
    });
    if (existingLike) {
      throw new ConflictException('이미 좋아요가 존재합니다.');
    }
    await this.communityBoardLikeRepository.save({ user, board });
    return true;
  }

  async deleteGameBoardLike(userEmail: string, boardId: string) {
    // 1. 현재 유저 가져오기

    const user = userEmail
      ? await this.userRepository.findOne({
          where: { email: userEmail },
        })
      : null;
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const board = boardId
      ? await this.communityBoardRepository.findOne({
          where: { id: boardId },
        })
      : null;
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const like = await this.communityBoardLikeRepository.findOne({
      where: {
        user: { email: userEmail },
        board: { id: boardId },
      },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 찾을 수 없습니다.');
    }

    await this.communityBoardLikeRepository.delete(like.id);
  }
}
