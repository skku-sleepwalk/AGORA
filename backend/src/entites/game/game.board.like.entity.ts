import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameBoard } from './game.board.entity';
import { User } from '../user.entity';
import { LikeAction } from 'src/common/types/likeAction.type';

@Entity('GameBoardLike')
export class GameBoardLike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameBoard, (board) => board.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  readonly board: GameBoard;

  @ManyToOne(() => User, (user) => user.gameBoardLikes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column('varchar', { nullable: true, default: null })
  likeAction: LikeAction;
}
