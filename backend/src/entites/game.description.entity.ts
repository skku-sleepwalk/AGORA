import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity('GameInformation')
export class GameInformation {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ description: '게임 정보에 들어갈 긴 설명' })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ description: '사양' })
  @Column({ nullable: false })
  specification: string;

  @ApiProperty({})
  @OneToOne(() => Game, (game) => game.information, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gameId', referencedColumnName: 'id' })
  game: Game;
}
