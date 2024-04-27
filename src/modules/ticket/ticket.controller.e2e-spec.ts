import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { LOG_LEVEL, MONGODB_URI } from '../../configs/envs';
import { MongodbModule } from '../../infrastructure/database/database.module';
import { TicketModule } from './ticket.module';
import { DATABASE_CONNECTION } from '../../common/constants';
import { Ticket } from '../../domain/schema/ticket/ticket.interface';

describe('TicketController', () => {
  let app: INestApplication;
  let conn: any;
  let ticketService: TicketService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: LOG_LEVEL,
        }),
        MongodbModule.forRoot(MONGODB_URI, {}),
        TicketModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        stopAtFirstError: true,
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();

    conn = module.get<any>(DATABASE_CONNECTION);
    ticketService = module.get<TicketService>(TicketService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should find tickets by project id', async () => {
    const fakeProjectId = 0;

    const findManyByProjectIdFunc = jest.spyOn(
      ticketService,
      'findManyByProjectId',
    );
    findManyByProjectIdFunc.mockImplementationOnce(() => Promise.resolve([]));

    const { body } = await request(app.getHttpServer())
      .get(`/tickets?projectId=${fakeProjectId}`)
      .send()
      .expect(200);

    expect(findManyByProjectIdFunc).toHaveBeenCalledTimes(1);
    expect(findManyByProjectIdFunc).toHaveBeenCalledWith(fakeProjectId);
  });

  it('Should update ticket', async () => {
    const fakeProjectId = 0;
    const fakeTicketId = 0;
    const fakePayload = {
      asigneeId: 0,
      reporterId: 0,
      requestTypeId: 0,
      stageId: 0,
    };

    const validateUpdatePayloadFunc = jest.spyOn(
      ticketService,
      'validateUpdatePayload',
    );
    validateUpdatePayloadFunc.mockImplementationOnce(() => Promise.resolve(''));

    const updateFunc = jest.spyOn(ticketService, 'update');
    updateFunc.mockImplementationOnce(() => Promise.resolve({} as Ticket));

    const { body } = await request(app.getHttpServer())
      .put(`/tickets/${fakeProjectId}/${fakeTicketId}`)
      .send(fakePayload)
      .expect(200);

    expect(validateUpdatePayloadFunc).toHaveBeenCalledTimes(1);
    expect(validateUpdatePayloadFunc).toHaveBeenCalledWith({
      projectId: fakeProjectId,
      ticketId: fakeTicketId,
      ...fakePayload,
    });

    expect(updateFunc).toHaveBeenCalledTimes(1);
    expect(updateFunc).toHaveBeenCalledWith(fakeTicketId, fakePayload);
  });

  afterAll(async () => {
    await conn.disconnect();
  });
});
