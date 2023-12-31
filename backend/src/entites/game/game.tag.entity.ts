import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameTagRelation } from './game.tag.relation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('GameTag')
export class GameTag {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: '스산한', description: '태그 이름' })
  @Column({ unique: true, nullable: false })
  readonly name: string;

  @OneToMany(() => GameTagRelation, (relation) => relation.tag, {
    cascade: true,
  })
  readonly relations: Array<GameTagRelation>;
}
