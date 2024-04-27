import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Validate } from 'class-validator';
import { BaseResponseDto } from '../../../common/dto/base.dto';
import { FindTicketsByProjectBoard } from '../../../common/type/ticket.type';
import { ProjectExistsRule } from '../../../presentation/decorators/project-id-validate';

export class FindTicketsByProjectIdQueryDto {
  @Validate(ProjectExistsRule)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  projectId: number;
}

class ResponseData {
  tickets: FindTicketsByProjectBoard[];
}

export class FindTicketsByProjectIdResponseDto extends BaseResponseDto {
  data: ResponseData;
}
