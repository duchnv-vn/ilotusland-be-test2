import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoggerService } from '../../infrastructure/logger/logger.service';

@Injectable()
export class GetUserInfo implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const authorizationStr =
        req.headers['authorization'] || req.headers['Authorization'] || '';
      const userInfoPath = req.user?.userInfo || '';

      if (!userInfoPath) return false;

      const res = await this.httpService.axiosRef.get(userInfoPath, {
        headers: { Authorization: authorizationStr },
      });

      delete req.user?.userInfo;
      Object.assign(req.user, {
        _id: getUserIdFromAuth0Sub(res.data.sub),
        email: res.data.email,
        name: res.data.name,
        avatarUrl: res.data.picture,
      });

      return true;
    } catch (error) {
      this.logger.debug('GetUserInfoError', error);
      throw new UnauthorizedException();
    }
  }
}

const getUserIdFromAuth0Sub = (sub: string) => {
  const splittedSub = sub.split('|');
  const id = splittedSub[1];
  return Number(id);
};
