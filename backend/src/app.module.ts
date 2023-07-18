import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './developer-community/developer-community-boards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from 'src/upload/upload.module';
import { AssetStoreModule } from './asset-store/asset-store.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GameStoreModule } from './game-store/game-store.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'board-app',
        entities: ['dist/**/**.entity{.ts,.js}'],
        synchronize: true,
        timezone: configService.get<string>('APP_TIMEZONE'), // ConfigService를 사용하여 타임존 값을 읽어옴})
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BoardsModule,
    UploadModule,
    AssetStoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    GameStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
