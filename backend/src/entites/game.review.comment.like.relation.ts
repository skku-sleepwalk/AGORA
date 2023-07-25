import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameReviewComment } from './game.review.comment.entity';
import { User } from './user.entity';
import { LikeAction } from 'src/common/types/likeAction.type';

@Entity('GameReviewCommentLikeRelation')
export class GameReviewCommentLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameReviewComment, (comment) => comment.likeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'commentId', referencedColumnName: 'id' }])
  readonly comment: GameReviewComment;

  @ManyToOne(() => User, (user) => user.gameReviewCommentLikeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column('varchar', { nullable: true })
  likeAction: LikeAction;
}
