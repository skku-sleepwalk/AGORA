import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './images',
    }),
    MulterModule.register({
      dest: './games',
    }),
    MulterModule.register({
      dest: './videos',
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
