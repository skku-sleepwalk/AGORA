import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('GameDescription')
export class GameDescription {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ description: '게임 정보에 들어갈 긴 설명' })
  @Column({ nullable: false })
  content: string;

  @OneToOne(() => Game, (game) => game.description, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId', referencedColumnName: 'id' })
  game: Game;
}
