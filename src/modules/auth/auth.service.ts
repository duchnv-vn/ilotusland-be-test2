import { Injectable } from '@nestjs/common';
import { LoginBodyDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  verify(payload: LoginBodyDto) {
    return { accessToken: '' };
  }
}
