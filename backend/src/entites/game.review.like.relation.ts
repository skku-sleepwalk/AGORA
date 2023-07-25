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

@Entity('GameReviewLikeRelation')
export class GameReviewLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => GameReview, (review) => review.likeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'reviewId', referencedColumnName: 'id' }])
  readonly gameReview: GameReview;

  @ManyToOne(() => User, (user) => user.gameReviewLikeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column('varchar', { nullable: true })
  likeAction: LikeAction;
}
