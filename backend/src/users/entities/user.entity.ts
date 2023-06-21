import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 32 })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  token!: number;

  @Column()
  rating!: number;

  @Column({ type: 'timestamp', nullable: false })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
