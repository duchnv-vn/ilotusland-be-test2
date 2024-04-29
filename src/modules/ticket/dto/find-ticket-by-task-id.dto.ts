import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Validate } from 'class-validator';
import { TicketExistsRule } from '../../../presentation/decorators/ticket-id-validate';

export class FindTicketByIdParamsDto {
  @Validate(TicketExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  id: number;
}
