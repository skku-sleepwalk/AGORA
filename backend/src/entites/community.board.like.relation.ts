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

@Entity('CommunityBoardLikeRelation')
export class CommunityBoardLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => CommunityBoard, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  readonly board: CommunityBoard;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column('varchar', { nullable: true, default: null })
  likeAction: LikeAction;
}
