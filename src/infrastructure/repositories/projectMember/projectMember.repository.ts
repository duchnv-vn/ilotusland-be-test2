import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/constants';
import { ProjectMember } from '../../../domain/schema/projectMember/projectMember.interface';

@Injectable()
export class ProjectMemberRepository extends BaseRepository<ProjectMember> {
  constructor(
    @Inject(ModelName.PROJECT_MEMBER)
    protected readonly model: Model<ProjectMember>,
  ) {
    super(model);
  }
}
