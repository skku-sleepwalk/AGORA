import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameBoard } from './game.board.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('GameBoardCategory')
export class GameBoardCategory {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '카테고리 명', example: '공략' })
  @Column({ nullable: false, unique: true })
  readonly name: string;

  @ManyToMany(() => GameBoard)
  boards: Array<GameBoard>;
}
