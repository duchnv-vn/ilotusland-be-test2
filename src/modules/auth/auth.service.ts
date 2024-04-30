import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { pick } from 'lodash';
import { LoginBodyDto } from './dto/login.dto';
import { User } from '../../domain/schema/user/user.interface';
import { UserRepository } from '../../infrastructure/repositories/user/user.repository';
import {
  JWT_PUBLIC_SECRET_KEY,
  AUTH0_TOKEN_SIGN_ALG,
} from '../../configs/envs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async generateAccessToken(user: User) {
    const token = await this.jwtService.signAsync(
      {
        username: user.name,
        sub: user._id,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      {
        secret: JWT_PUBLIC_SECRET_KEY,
        algorithm: AUTH0_TOKEN_SIGN_ALG as any,
      },
    );

    return token;
  }

  async validateUser({ email, password }: LoginBodyDto): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? pick(user, '_id', 'name', 'email', 'avatarUrl') : null;
  }
}
