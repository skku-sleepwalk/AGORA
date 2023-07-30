import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

@Entity('GameGenre')
export class GameGenre {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: 'FPS', description: '장르 이름' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Game, (game) => game.genres)
  game: Array<Game>;
}
