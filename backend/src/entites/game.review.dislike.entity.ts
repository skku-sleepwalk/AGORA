import { LikeAction } from 'src/common/types/likeAction.type';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameReview } from './game.review.entity';
import { User } from './user.entity';

@Entity('GameReviewDislike')
export class GameReviewDislike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameReview, (review) => review.dislikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  readonly review: GameReview;

  @ManyToOne(() => User, (user) => user.gameReviewDislikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;
}
