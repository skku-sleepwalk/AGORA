import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameReview } from './game.review.entity';
import { User } from '../user.entity';

@Entity('GameReviewLike')
export class GameReviewLike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameReview, (review) => review.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  readonly review: GameReview;

  @ManyToOne(() => User, (user) => user.gameReviewLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;
}
