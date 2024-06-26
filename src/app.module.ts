import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/ticket/ticket.module';
import { MongodbModule } from './infrastructure/database/database.module';
import { AppExceptionFilter } from './presentation/filters/app-exception.filter';
import { LOG_LEVEL, MONGODB_URI } from './configs/envs';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ValidateTokenJWTModule } from './infrastructure/auth/validate-token-jwt/jwt.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ValidateTokenJWTModule,
    LoggerModule.forRoot({
      level: LOG_LEVEL,
    }),
    MongodbModule.forRoot(MONGODB_URI, {}),
    TicketModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
