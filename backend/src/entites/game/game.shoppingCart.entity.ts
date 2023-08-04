import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user.entity';
import { GameStore } from './game.store.entity';

@Entity('GameShoppingCartItem')
export class GameShoppingCartItem {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.gameShoppingCartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  readonly user: User;

  @ManyToOne(() => GameStore, (gameStore) => gameStore.shoppingCartItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'gameStoreId', referencedColumnName: 'id' }])
  readonly gameStore: GameStore;
}
