import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { CollectionName, ModelName } from '../../../common/constants';
import { TicketRepository } from './ticket.repository';
import { TicketSchema } from '../../../domain/schema/ticket/ticket.schema';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.TICKET,
        schema: TicketSchema,
        collection: CollectionName[ModelName.TICKET],
      },
    ]),
  ],
  providers: [TicketRepository],
  exports: [TicketRepository],
})
export class TicketRepositoryModule {}
