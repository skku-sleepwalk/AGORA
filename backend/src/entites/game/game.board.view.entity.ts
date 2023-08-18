import { GameBoard } from 'src/entites/game/game.board.entity';
import { User } from 'src/entites/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('GameBoardView')
export class GameBoardView {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameBoard, (gameBoard) => gameBoard.views, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  readonly board: GameBoard;

  @ManyToOne(() => User, (user) => user.gameBoardViews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @CreateDateColumn()
  readonly createdAt: Date;
}
