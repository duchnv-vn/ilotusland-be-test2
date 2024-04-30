import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Validate } from 'class-validator';
import { TicketExistsRule } from '../../../presentation/decorators/ticket-id-validate';
import { ProjectExistsRule } from '../../../presentation/decorators/project-id-validate';

export class FindTicketByIdParamsDto {
  @Validate(ProjectExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  projectId: number;

  @Validate(TicketExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  ticketId: number;
}
