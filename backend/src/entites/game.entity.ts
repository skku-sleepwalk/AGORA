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
import { PlayTimeRelation } from './game.playtime.relation.entity';
import { GameGenre } from './game.genre.entity';
import { GameTag } from './game.tag.entity';
import { GameTagRelation } from './game.tag.relation.entity';
import { GameDescription } from './game.description.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { GameLikeRelation } from './game.like.relation.entity';

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

  @OneToOne(() => GameStore, (gameStore) => gameStore.game, { cascade: true })
  readonly store: GameStore;

  @OneToOne(() => GameDescription, (description) => description.game, {
    cascade: true,
  })
  readonly description: GameDescription;

  @OneToMany(() => GameReview, (review) => review.game, {
    cascade: true,
  })
  reviews: Array<GameReview>;

  @OneToMany(() => GameBoard, (board) => board.game, {
    cascade: true,
  })
  boards: Array<GameBoard>;

  @ApiProperty({
    example: 4.5,
    description: '별점(소숫점 첫째자리까지 나타냄)',
  })
  @Column('float', { nullable: false, default: 0 })
  rating: number;

  @OneToMany(() => PlayTimeRelation, (relation) => relation.game, {
    cascade: true,
  })
  readonly playtimeRelations: Array<PlayTimeRelation>;

  @OneToMany(() => GameTagRelation, (relation) => relation.game, {
    cascade: true,
  })
  readonly tagRelations: Array<GameTagRelation>;

  @ManyToMany(() => GameGenre)
  @JoinTable({
    name: 'genres',
    joinColumn: { name: 'genreId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'gameStoreId', referencedColumnName: 'id' },
  })
  genres: Array<GameGenre>;

  @ManyToMany(() => GameTag, (tag) => tag.popularedGames)
  @JoinTable({
    name: 'popularTags',
    joinColumn: { name: 'tagId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'gameStoreId', referencedColumnName: 'id' },
  })
  popularTags: Array<GameTag>;

  @OneToMany(() => GameLikeRelation, (relation) => relation.game, {
    cascade: true,
  })
  likeRelations: Array<GameLikeRelation>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
