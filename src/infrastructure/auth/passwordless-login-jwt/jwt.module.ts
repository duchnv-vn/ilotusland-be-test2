import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasswordlessLoginJwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [PasswordlessLoginJwtStrategy],
  exports: [PassportModule],
})
export class PasswordlessLoginJWTModule {}
