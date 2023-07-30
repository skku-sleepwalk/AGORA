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
import { CommunityCategory } from './community.category.entity';
import { CommunityBoardLike } from './community.board.like.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('CommunityBoard')
export class CommunityBoard {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ description: '제목', example: '멋진 제목' })
  @Column({ length: 32, nullable: true })
  title: string;

  @ApiProperty({ description: '내용', example: '멋진 내용' })
  @Column({ nullable: false })
  content: string;

  // @ApiProperty({ description: '좋아요 수', example: 3 })
  // @Column({ nullable: false, default: 0 })
  // likeCount: number;

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

  @ManyToOne(() => User, (user) => user.communityBoards)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @ManyToOne(() => CommunityBoard, { nullable: true })
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: CommunityBoard;

  @OneToMany(() => CommunityBoard, (board) => board.parent)
  children: CommunityBoard[];

  @OneToMany(() => CommunityBoardLike, (relation) => relation.board, {
    cascade: true,
  })
  likes: Array<CommunityBoardLike>;

  @ManyToMany(() => CommunityCategory)
  @JoinTable({
    name: 'categoryIds',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'boardId', referencedColumnName: 'id' },
  })
  categories: CommunityCategory[];
}
