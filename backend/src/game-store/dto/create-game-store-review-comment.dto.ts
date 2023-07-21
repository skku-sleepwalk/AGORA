import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateGameStoreReviewCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly reviewId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
