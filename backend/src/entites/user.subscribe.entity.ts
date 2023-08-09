import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column({ type: 'timestamp', nullable: false })
  startAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  endAt: Date;
}
