import { ApiProperty, PickType } from '@nestjs/swagger';
import { GameTagRelation } from 'src/entites/game/game.tag.relation.entity';
import { GameTagDto } from './game.tag.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class GameTagRelationDto extends PickType(GameTagRelation, ['id']) {
  @ApiProperty({ description: '태그', type: () => GameTagDto })
  @IsNotEmpty()
  @ValidateNested()
  tag: GameTagDto;
}
