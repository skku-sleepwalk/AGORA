import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { CommunityBoard } from './community.board.entity';

@Entity('CommunityBoardView')
export class CommunityBoardView {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => CommunityBoard, (communityBoard) => communityBoard.views, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  readonly board: CommunityBoard;

  @ManyToOne(() => User, (user) => user.communityBoardViews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @CreateDateColumn()
  readonly createdAt: Date;
}
