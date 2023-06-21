import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //DTO에 없는 값은 거르고 에러메세지 출력
      forbidNonWhitelisted: true, //DTO에 존재하지 않는 값이 들어오면 에러메세지 출력
      transform: true, //넘어오는 값은 무조건 string이라 하나하나 원하는 타입으로 바꿔줘야하는데, 이러한 불편함을 없애줌
    }),
  );
}
bootstrap();
