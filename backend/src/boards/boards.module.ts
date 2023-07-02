import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BoardRepository } from './boards.repository';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { Board } from './entities/board.entity';
@Module({
  imports: [
    BoardsModule,
    UsersModule,
    CategoryModule,
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository, UsersService, CategoryService],
})
export class BoardsModule {}
