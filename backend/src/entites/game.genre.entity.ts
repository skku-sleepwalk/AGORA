import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameStore } from './game.store.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('GameGenre')
export class GameGenre {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: 'FPS', description: '장르 이름' })
  @Column({ unique: true, nullable: false })
  readonly name: string;

  @ManyToMany(() => GameStore, { onDelete: 'CASCADE' })
  gameStore: Array<GameStore>;
}
