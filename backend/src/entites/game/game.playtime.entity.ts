import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { Game } from './game.entity';

@Entity('PlayTime')
export class PlayTime {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @ManyToOne(() => Game, (game) => game.playtimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  readonly game: Game;

  @ManyToOne(() => User, (user) => user.playtimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column({ nullable: false, default: 0 })
  playtime: number;
}
