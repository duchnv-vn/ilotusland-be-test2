import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TicketModule } from './modules/ticket/ticket.module';
import { MongodbModule } from './infrastructure/database/database.module';
import { AppExceptionFilter } from './presentation/filters/app-exception.filter';
import { MONGODB_URI } from './configs/envs';

@Module({
  imports: [MongodbModule.forRoot(MONGODB_URI, {}), TicketModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
