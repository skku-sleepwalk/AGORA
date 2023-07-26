import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorResponseDto, SuccessResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        if (data instanceof ErrorResponseDto) {
          response.status(data.code); // 응답 코드를 설정합니다.
          return data;
        } else if (data instanceof SuccessResponseDto) {
          response.status(data.code); // 응답 코드를 설정합니다.
          return data;
        } else {
          // 만약 데이터가 우리가 정의한 custom response 객체들의 인스턴스가 아니라면, 성공 응답으로 간주합니다.
          return new SuccessResponseDto(data);
        }
      }),
    );
  }
}
