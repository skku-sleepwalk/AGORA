import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CustomParseArrayPipe implements PipeTransform<string, string[]> {
  transform(value: string, metadata: ArgumentMetadata): string[] {
    const separator = ','; // 구분자 설정
    const items = value.split(separator); // 구분자를 기준으로 문자열을 나눔
    const processedItems = items.map((item) => {
      // 특수 문자 처리 로직을 추가
      // 예시: 특수 문자 '%'를 '+'로 대체
      return item.replace('%', '+');
    });
    return processedItems;
  }
}
