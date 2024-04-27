import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/enum/collection';
import { Project } from '../../../domain/schema/project/project.interface';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(
    @Inject(ModelName.PROJECT)
    protected readonly model: Model<Project>,
  ) {
    super(model);
  }

  async checkStageExist(projectId: number, stageId: number): Promise<boolean> {
    const count = await this.model.countDocuments({
      $and: [{ _id: projectId }, { stages: { $elemMatch: { id: stageId } } }],
    });
    return count > 0;
  }

  async checkRequestTypeExist(projectId: number, requestTypeId: number) {
    const count = await this.model.countDocuments({
      $and: [
        { _id: projectId },
        { requestTypes: { $elemMatch: { id: requestTypeId } } },
      ],
    });
    return count > 0;
  }
}
