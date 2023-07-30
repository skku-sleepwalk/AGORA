export class SuccessResponseDto {
  success: boolean;
  code: number;
  data: any;

  constructor(data: any, code = 200) {
    this.success = true;
    this.code = code;
    this.data = data;
  }
}

// ErrorResponseDto.ts
export class ErrorResponseDto {
  success: boolean;
  code: number;
  data: string;

  constructor(data: string, code: number) {
    this.success = false;
    this.code = code;
    this.data = data;
  }
}
