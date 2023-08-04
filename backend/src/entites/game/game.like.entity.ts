import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user.entity';
import { Game } from './game.entity';

@Entity('GameLike')
export class GameLike {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Game, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  game: Game;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
