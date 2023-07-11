import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from 'src/upload/upload.module';
import { AssetStoreModule } from './asset-store/asset-store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'board-app',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'Asia/Seoul', // 'local', 'Z', '+HH:MM', '-HH:MM' 등으로 적절히 변경해주세요. 기본값은 'local' 입니다
    }),
    UsersModule,
    BoardsModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AssetStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
