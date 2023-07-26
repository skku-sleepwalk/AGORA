import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';
import { LikeAction } from 'src/common/types/likeAction.type';

@Entity('GameLikeRelation')
export class GameLikeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Game, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  game: Game;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'Id', referencedColumnName: 'id' }])
  user: User;

  @Column('varchar', { nullable: true, default: null })
  likeAction: LikeAction;
}
