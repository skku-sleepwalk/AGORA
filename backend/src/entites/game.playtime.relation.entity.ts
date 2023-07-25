import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity('PlayTimeRelation')
export class PlayTimeRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Game, (game) => game.playtimeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameStoreId', referencedColumnName: 'id' }])
  readonly game: Game;

  @ManyToOne(() => User, (user) => user.playtimeRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @Column({ nullable: false, default: 0 })
  playTime: number;
}
