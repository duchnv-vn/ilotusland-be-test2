import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { LoginBodyDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('login')
  async create(@Body() body: LoginBodyDto) {
    try {
      const result = await this.authService.validateUser(body);
      // const accessToken = await this.authService.generateAccessToken(result);
      return { isValid: !!result };
    } catch (error) {
      this.logger.log('ticketController.findByProjectId', error);
      throw error;
    }
  }
}
