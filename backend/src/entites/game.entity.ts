import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameStore } from './game.store.entity';
import { User } from './user.entity';
import { GameReview } from './game.review.entity';
import { GameBoard } from './game.board.entity';
import { PlayTime } from './game.playtime.entity';
import { GameGenre } from './game.genre.entity';
import { GameTagRelation } from './game.tag.relation.entity';
import { GameInformation } from './game.information.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { GameLike } from './game.like.entity';

@Entity('Game')
export class Game {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({
    example: 'CartRider-Drift',
    description: '코드네임',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false, unique: true })
  title: string;

  @ManyToOne(() => User, (user) => user.gameStores)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @ApiProperty({ description: '다운로드 경로' })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  downloadUrl: string;

  @ApiProperty({ description: '실행 경로' })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  executablePath: string;

  @ApiProperty({ description: '카드에 들어갈 이미지 url' })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  shortImgUrl: string;

  @ApiProperty({
    description: '카드에 들어갈 짧은 설명',
    example: '이 게임은 레이싱 게임입니다.',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: false })
  shortContent: string;

  @ApiProperty({ description: '게임 아이콘 url' })
  @Column({ nullable: true })
  iconUrl: string;

  @OneToOne(() => GameStore, (gameStore) => gameStore.game, { cascade: true })
  readonly store: GameStore;

  @OneToOne(() => GameInformation, (info) => info.game, {
    cascade: true,
  })
  information: GameInformation;

  @OneToMany(() => GameReview, (review) => review.game, {
    cascade: true,
  })
  reviews: Array<GameReview>;

  @OneToMany(() => GameBoard, (board) => board.game, {
    cascade: true,
  })
  boards: Array<GameBoard>;

  @OneToMany(() => PlayTime, (relation) => relation.game, {
    cascade: true,
  })
  readonly playtimes: Array<PlayTime>;

  @OneToMany(() => GameTagRelation, (relation) => relation.game, {
    cascade: true,
  })
  readonly tagRelations: Array<GameTagRelation>;

  @ManyToMany(() => GameGenre)
  @JoinTable({
    name: 'genres',
    joinColumn: { name: 'genreId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'gameId', referencedColumnName: 'id' },
  })
  genres: Array<GameGenre>;

  @OneToMany(() => GameLike, (relation) => relation.game, {
    cascade: true,
  })
  likes: Array<GameLike>;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일자' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제일자' })
  @DeleteDateColumn()
  deletedAt?: Date | null;
}
