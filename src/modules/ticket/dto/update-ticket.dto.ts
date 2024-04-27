import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { TicketPriority } from '../../../domain/enum/ticket-priority';
import { UserExistsRule } from '../../../presentation/decorators/user-id-validate';
import { CompanyExistsRule } from '../../../presentation/decorators/company-id-validate';
import { CustomerExistsRule } from '../../../presentation/decorators/customer-id-validate';
import { ProjectExistsRule } from '../../../presentation/decorators/project-id-validate';
import { TicketExistsRule } from '../../../presentation/decorators/ticket-id-validate';

export class UpdateTicketParamsDto {
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

export class UpdateTicketBodyDto {
  @Validate(UserExistsRule)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  asigneeId: number;

  @Validate(UserExistsRule)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  reporterId: number;

  @Validate(CustomerExistsRule)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  customerId: number;

  @Validate(CompanyExistsRule)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  companyId: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  stageId: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  requestTypeId: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsEnum(TicketPriority)
  @IsOptional()
  priority: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @Min(0)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  timeTracking: number;

  @Min(0)
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  dueDate: number;

  @IsIn([0, 1])
  @IsInt()
  @IsOptional()
  deleteFlag: number;
}
