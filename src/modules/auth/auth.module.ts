import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    // JwtModule.register({
    //   secret: 'secret',
    //   signOptions: {
    //     expiresIn: '1h',
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
