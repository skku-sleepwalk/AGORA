import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameStore } from './game.store.entity';
import { GameTag } from './game.tag.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

@Entity('GameTagRelation')
export class GameTagRelation {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '게임' })
  @ManyToOne(() => Game, (game) => game.gameTagRelations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameStoreId', referencedColumnName: 'id' }])
  readonly gameStore: GameStore;

  @ApiProperty({ description: '태그' })
  @ManyToOne(() => GameTag, (tag) => tag.relations)
  @JoinColumn([{ name: 'tagId', referencedColumnName: 'id' }])
  readonly tag: GameTag;

  @ManyToOne(() => User, (user) => user.gameTagRelations)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;
}
