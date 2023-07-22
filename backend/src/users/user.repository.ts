import { EntityRepository, Repository } from 'typeorm';
import { GameStoreShoppingCartItem, User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

@EntityRepository(GameStoreShoppingCartItem)
export class GameStoreShoppingCartItemRepository extends Repository<GameStoreShoppingCartItem> {}
