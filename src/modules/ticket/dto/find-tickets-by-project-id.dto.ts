import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';
import { ProjectExistsRule } from '../../../presentation/decorators/project-id-validate';
import { TicketListType } from '../../../common/enum/ticket';

export class FindTicketsByProjectIdQueryDto {
  @Validate(ProjectExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  projectId: number;

  @IsInt()
  @IsEnum(TicketListType)
  @Transform(({ value }) => Number(value))
  @IsOptional()
  listType?: number;
}
