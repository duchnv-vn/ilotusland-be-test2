import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { TicketRepository } from './ticket.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { TicketRepositoryModule } from './ticket.module';

describe('TicketRepository', () => {
  let ticketRepository: TicketRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        TicketRepositoryModule,
      ],
      providers: [],
    }).compile();

    ticketRepository = module.get<TicketRepository>(TicketRepository);
  });

  it('Should be defined', () => {
    expect(ticketRepository).toBeDefined();
  });

  it('Should create a ticket successfully', async () => {
    const result = await ticketRepository.create({
      _id: 0,
      asigneeId: 1,
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
