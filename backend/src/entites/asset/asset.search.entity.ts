import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user.entity';

@Entity('AssetSearch')
export class AssetSearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.assetSearches)
  user: User;

  @Column()
  keyword: string;
}
