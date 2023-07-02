import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class QueryStringArrayDto {
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @Length(1, 5, { each: true })
  readonly queryData: string[];
}
