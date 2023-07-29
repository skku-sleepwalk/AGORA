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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameBoardCategory } from './game.board.category.entity';
import { GameBoardLike } from './game.board.like.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

@Entity('GameBoard')
export class GameBoard {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '제목', example: '멋진 제목' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ description: '내용', example: '멋진 내용' })
  @Column({ nullable: false })
  content: string;

  // @ApiProperty({ description: '댓글 수', example: 5 })
  // @Column({ nullable: false, default: 0 })
  // childCount: number;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;

  @OneToMany(() => GameBoardLike, (relation) => relation.board, {
    cascade: true,
  })
  likes: Array<GameBoardLike>;

  @ManyToOne(() => Game, (game) => game.boards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  readonly game: Game;

  @ManyToOne(() => User, (user) => user.communityBoards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @ManyToOne(() => GameBoard, { nullable: true })
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: GameBoard;

  @OneToMany(() => GameBoard, (board) => board.parent)
  children: Array<GameBoard>;

  @ManyToMany(() => GameBoardCategory)
  @JoinTable({
    name: 'categories',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'boardId', referencedColumnName: 'id' },
  })
  categories: Array<GameBoardCategory>;
}
