import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreatePlaytimeRelationDto } from './create-playtime-relation.dto';

export class UpdatePlaytimeRelationDto extends CreatePlaytimeRelationDto {
  @IsNotEmpty()
  @IsNumber()
  additionalPlayTime: number;
}
