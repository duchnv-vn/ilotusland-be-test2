import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TicketModule } from './modules/ticket/ticket.module';
import { MongodbModule } from './infrastructure/database/database.module';
import { AppExceptionFilter } from './presentation/filters/app-exception.filter';
import { LOG_LEVEL, MONGODB_URI } from './configs/envs';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { AuthGuard } from './presentation/guards/auth.guard';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: LOG_LEVEL,
    }),
    MongodbModule.forRoot(MONGODB_URI, {}),
    TicketModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
