import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/constants';
import { Project } from '../../../domain/schema/project/project.interface';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(
    @Inject(ModelName.PROJECT)
    protected readonly model: Model<Project>,
  ) {
    super(model);
  }
}
