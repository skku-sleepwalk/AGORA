import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('UserSubscribe')
export class UserSubscribe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscribe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  remainPlayTime: number;

  @CreateDateColumn()
  startAt: Date;

  @Column({ type: Timestamp })
  endAt: Date;
}
