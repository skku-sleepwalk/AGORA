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
}
