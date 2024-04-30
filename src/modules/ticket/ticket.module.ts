import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepositoryModule } from '../../infrastructure/repositories/ticket/ticket.module';
import { UserRepositoryModule } from '../../infrastructure/repositories/user/user.module';
import { UserExistsRule } from '../../presentation/decorators/user-id-validate';
import { CompanyExistsRule } from '../../presentation/decorators/company-id-validate';
import { CompanyRepositoryModule } from '../../infrastructure/repositories/company/company.module';
import { CustomerExistsRule } from '../../presentation/decorators/customer-id-validate';
import { CustomerRepositoryModule } from '../../infrastructure/repositories/customer/customer.module';
import { ProjectRepositoryModule } from '../../infrastructure/repositories/project/project.module';
import { ProjectMemberRepositoryModule } from '../../infrastructure/repositories/projectMember/projectMember.module';
import { ProjectExistsRule } from '../../presentation/decorators/project-id-validate';
import { TicketExistsRule } from '../../presentation/decorators/ticket-id-validate';
import { LoggerModule } from '../../infrastructure/logger/logger.module';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    LoggerModule,
    TicketRepositoryModule,
    UserRepositoryModule,
    CompanyRepositoryModule,
    CustomerRepositoryModule,
    ProjectRepositoryModule,
    ProjectMemberRepositoryModule,
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    UserExistsRule,
    CompanyExistsRule,
    CustomerExistsRule,
    ProjectExistsRule,
    TicketExistsRule,
  ],
})
export class TicketModule {}
