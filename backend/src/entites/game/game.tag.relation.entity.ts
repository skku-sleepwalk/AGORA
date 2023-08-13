import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameTag } from './game.tag.entity';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

@Entity('GameTagRelation')
export class GameTagRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '게임' })
  @ManyToOne(() => Game, (game) => game.tagRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  game: Game;

  @ApiProperty({ description: '태그' })
  @ManyToOne(() => GameTag, (tag) => tag.relations, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'tagId', referencedColumnName: 'id' }])
  tag: GameTag;

  @ManyToOne(() => User, (user) => user.gameTagRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
