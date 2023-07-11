import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage, File } from 'multer';
import { BadRequestException } from '@nestjs/common';

@Controller()
export class UploadController {
  @Post('/upload/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        const ext = extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(ext)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only image files are allowed'), false);
        }
      },
    }),
  )
  uploadImage(@UploadedFile() file: File) {
    console.log(file);
    return {
      url: `http://localhost:8000/images/${file.filename}`,
      file,
    };
  }

  @Post('/upload/game')
  @UseInterceptors(
    FileInterceptor('game', {
      storage: diskStorage({
        destination: './static/games', // 게임 파일 저장 경로 설정
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const ext = extname(file.originalname);
          cb(null, `${randomName}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.exe', '.dmg', '.zip']; // 허용되는 게임 파일 확장자 설정

        const ext = extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(ext)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Only game files (exe, dmg, zip) are allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  uploadGame(@UploadedFile() file) {
    return {
      url: `http://localhost:8000/games/${file.filename}`, // 다운로드 링크 생성
      file,
    };
  }
  @Post('/upload/video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './static/videos', // 동영상 파일 저장 경로 설정
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const ext = extname(file.originalname);
          cb(null, `${randomName}${ext}`);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file) {
    return {
      url: `http://localhost:8000/videos/${file.filename}`, // 다운로드 링크 생성
      file,
    };
  }
}
