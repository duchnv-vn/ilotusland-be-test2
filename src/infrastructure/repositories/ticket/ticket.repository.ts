import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/enum/collection';
import { Ticket } from '../../../domain/schema/ticket/ticket.interface';
import { FindTicketsByProjectBoard } from '../../../common/type/ticket.type';
import { findTicketsByProjectPiplineBuilder } from '../sharedPipelines/ticket/findByProjectId';

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
        customerId: 1,
        companyId: 1,
      },
    });

    return this.model.aggregate<FindTicketsByProjectBoard>(pipeline);
  }
}
