import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Board')
export class Board {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  writerId: string;

  @Column('uuid', { nullable: true })
  parentId: string;

  @Column({ length: 32 })
  title: string;

  @Column()
  description: string;

  @Column()
  like: number;

  @Column()
  @Column({ type: 'timestamp', nullable: false })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
