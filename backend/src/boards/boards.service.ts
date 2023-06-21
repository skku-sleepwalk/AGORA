import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './boards.repository';
import { validate } from 'class-validator';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: BoardRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto) {
    const { writerId, title, description, parentId } = createBoardDto;

    const newBoard: Board = {
      id: uuid(),
      writerId,
      parentId,
      title,
      description,
      createdAt: new Date(),
      like: 0,
    };
    newBoard.writerId = writerId;
    newBoard.title = title;
    newBoard.description = description;
    newBoard.createdAt = new Date();

    const validation_error = await validate(newBoard);
    if (validation_error.length > 0) {
      throw new HttpException({ message: 'error' }, HttpStatus.BAD_REQUEST);
    } else {
      return await this.boardRepository.save(newBoard);
    }
  }

  getAllBoard() {
    return this.boardRepository.find();
  }

  getChlidBoards() {
    return 'This action returns all childBoards';
  }

  findOne(id: string) {
    return this.boardRepository.findOne(id);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const toUpdateBoard = await this.boardRepository.findOne(id);
    const { updateId, title, description } = updateBoardDto;
    if (updateId === toUpdateBoard.writerId) {
      toUpdateBoard.title = title;
      toUpdateBoard.description = description;
      toUpdateBoard.updatedAt = new Date();
      return await this.boardRepository.save(toUpdateBoard);
    } else {
      throw new HttpException(
        { message: 'Not writter error' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(boardId: string) {
    await this.boardRepository.delete({ id: boardId });
  }
}
