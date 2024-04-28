import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() createAuthDto: LoginBodyDto) {
    return this.authService.verify(createAuthDto);
  }
}
