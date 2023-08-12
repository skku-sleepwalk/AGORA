import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

export const UuidParam = createParamDecorator(
  (paramName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const param = request.params[paramName];
    if (!param) {
      throw new BadRequestException(
        `요청 파라미터 ${paramName}이(가) 필요합니다.`,
      );
    }
    if (!isUUID(param, '4')) {
      // '4'는 UUID 버전을 나타냅니다.
      throw new BadRequestException('올바른 UUID 형식이 아닙니다.');
    }

    return request.params[paramName]; // You can modify this to manipulate or validate the parameter value
  },
  [],
);
