import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

export const UserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      return null;
      //   throw new BadRequestException('Authorization 헤더가 필요합니다');
    }
    if (!isEmail(authorization)) {
      throw new BadRequestException('올바른 이메일 형식이 아닙니다.');
    }
    return request.headers.authorization;
  },
);
