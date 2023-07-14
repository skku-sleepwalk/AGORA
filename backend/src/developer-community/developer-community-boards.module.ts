import { Module } from '@nestjs/common';
import { BoardsService } from './developer-community-boards.service';
import { BoardsController } from './developer-community-boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BoardRepository } from './developer-community-boards.repository';
import { CategoryModule } from './developer-community-category/developer-community-category.module';
import { Board } from './entities/developer-community-board.entity';
@Module({
  imports: [UsersModule, CategoryModule, TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
