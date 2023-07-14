import { EntityRepository, Repository } from 'typeorm';
import { Board } from './entities/developer-community-board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
