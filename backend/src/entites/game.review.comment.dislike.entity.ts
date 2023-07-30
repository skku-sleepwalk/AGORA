import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameReviewComment } from './game.review.comment.entity';
import { User } from './user.entity';

@Entity('GameReviewCommentDislike')
export class GameReviewCommentDislike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameReviewComment, (comment) => comment.dislikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'commentId', referencedColumnName: 'id' }])
  readonly comment: GameReviewComment;

  @ManyToOne(() => User, (user) => user.gameReviewCommentDislikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;
}
