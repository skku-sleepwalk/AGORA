import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameStore {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}
