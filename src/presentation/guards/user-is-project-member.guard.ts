import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { ProjectMemberRepository } from '../../infrastructure/repositories/projectMember/projectMember.repository';
import { User } from '../../domain/schema/user/user.interface';

@Injectable()
export class UserIsProjectMemberRule implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly projectMemberRepo: ProjectMemberRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const { _id } = req.user as User;
      const projectId = req.params?.projectId || req.query?.projectId;

      const isMember = await this.projectMemberRepo.checkExistBy({
        projectId: Number(projectId),
        userId: _id,
      });

      return isMember;
    } catch (error) {
      this.logger.debug('GetUserInfoError', error);
      throw new UnauthorizedException();
    }
  }
}
