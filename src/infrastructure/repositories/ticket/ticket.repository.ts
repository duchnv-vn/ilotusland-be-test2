import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/enum/collection';
import { Ticket } from '../../../domain/schema/ticket/ticket.interface';
import {
  FindTicketsByProjectBoard,
  FindTicketsByProjectList,
  FindTicketDetail,
} from '../../../common/type/ticket.type';
import { findTicketsByProjectPiplineBuilder } from '../sharedPipelines/ticket/findByProjectId';
import { findTicketByIdPiplineBuilder } from '../sharedPipelines/ticket/findByTaskId';

@Injectable()
export class TicketRepository extends BaseRepository<Ticket> {
  constructor(
    @Inject(ModelName.TICKET)
    protected readonly model: Model<Ticket>,
  ) {
    super(model);
  }

  async findTicketsByProjectBoard(projectId: number) {
    const pipeline = findTicketsByProjectPiplineBuilder({
      projectId,
      isGetAsigneeDetail: true,
      isGetReporterDetail: true,
      includeAttributes: {
        title: 1,
        stageId: 1,
        requestTypeId: 1,
        priority: 1,
        timeTracking: 1,
        dueDate: 1,
        customerId: 1,
        companyId: 1,
      },
    });

    return this.model.aggregate<FindTicketsByProjectBoard>(pipeline);
  }

  async findTicketsByProjectList(projectId: number) {
    const pipeline = findTicketsByProjectPiplineBuilder({
      projectId,
      isGetAsigneeDetail: true,
      includeAttributes: {
        title: 1,
        stageId: 1,
        priority: 1,
        dueDate: 1,
      },
    });

    return this.model.aggregate<FindTicketsByProjectList>(pipeline);
  }

  async findTicketDetail(taskId: number) {
    const pipeline = findTicketByIdPiplineBuilder({ taskId });
    return this.model.aggregate<FindTicketDetail>(pipeline);
  }
}
