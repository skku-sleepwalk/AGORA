import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityBoard } from './community.board.entity';
import { User } from './user.entity';
import { LikeAction } from 'src/common/types/likeAction.type';

@Entity('CommunityBoardLike')
export class CommunityBoardLike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => CommunityBoard, (board) => board.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  readonly board: CommunityBoard;

  @ManyToOne(() => User, (user) => user.communityBoardLikes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column('varchar', { nullable: true, default: null })
  likeAction: LikeAction;
}
