import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authorizationStr =
        req.headers['authorization'] || req.headers['Authorization'] || '';

      const [, token] = authorizationStr.split(' ');

      req.user = {};

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
