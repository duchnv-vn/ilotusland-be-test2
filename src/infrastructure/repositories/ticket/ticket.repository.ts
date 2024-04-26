import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/constants';
import { Ticket } from '../../../domain/schema/ticket/ticket.interface';

@Injectable()
export class TicketRepository extends BaseRepository<Ticket> {
  constructor(
    @Inject(ModelName.TICKET)
    protected readonly model: Model<Ticket>,
  ) {
    super(model);
  }
}
