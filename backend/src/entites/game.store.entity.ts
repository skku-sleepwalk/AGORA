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
  Relation,
} from 'typeorm';

import { GameCost } from './game.cost.entity';
import { User } from './user.entity';
import { GameShoppingCartItem } from './game.shoppingCart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from './game.entity';

export interface SNSUrls {
  youtube: string | null;
  twitch: string | null;
  twitter: string | null;
  discord: string | null;
  facebook: string | null;
  instagram: string | null;
  customPage: string | null;
}

@Entity('GameStore')
export class GameStore {
  @ApiProperty({ description: '아이디' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: '카트라이더', description: '스토어 이름' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: '넥슨', description: '배급사' })
  @Column({ nullable: false })
  distributor: string;

  @ApiProperty({ example: '니트로 스튜디오', description: '개발사' })
  @Column({ nullable: false })
  developer: string;

  @ApiProperty({ example: 30000, description: '가격' })
  @Column({ nullable: false })
  price: number;

  @ApiProperty({
    example: {
      id: 'uuid',
      youtube: 'youtube.com',
      twitch: 'twitch.com',
      twitter: 'twitter.com',
      discord: null,
      facebook: null,
      instagram: null,
      customPage: null,
    },
    description: 'SNS URL들',
  })
  @Column('json', { nullable: false })
  snsUrls: SNSUrls;

  @OneToOne(() => Game, (game) => game.store)
  @JoinColumn({ name: 'gameId', referencedColumnName: 'id' })
  game: Game;

  @OneToOne(() => GameCost, (cost) => cost.store, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'costId', referencedColumnName: 'id' })
  cost: Relation<GameCost>;

  @ManyToOne(() => User, (user) => user.gameStores)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @OneToMany(() => GameShoppingCartItem, (item) => item.gameStore, {
    cascade: true,
  })
  shoppingCartItems: Array<GameShoppingCartItem>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
