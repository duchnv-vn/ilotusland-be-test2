import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { TicketService } from './ticket.service';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { LOG_LEVEL, MONGODB_URI } from '../../configs/envs';
import { MongodbModule } from '../../infrastructure/database/database.module';
import { TicketModule } from './ticket.module';
import { DATABASE_CONNECTION } from '../../common/constants';
import { Ticket } from '../../domain/schema/ticket/ticket.interface';
import { TicketListType } from '../../common/enum/ticket';
import { ValidateTokenJWTModule } from '../../infrastructure/auth/validate-token-jwt/jwt.module';

describe('TicketController', () => {
  let app: INestApplication;
  let conn: any;
  let guard: IAuthGuard;
  let ticketService: TicketService;

  const userAccountCI = {
    _id: 0,
    name: 'testuser',
    email: 'testuser@gmail.com ',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ValidateTokenJWTModule,
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
    guard = module.get<IAuthGuard>(AuthGuard);
  });

  beforeEach(() => {
    const ca = jest.spyOn(guard, 'canActivate');

    ca.mockImplementation((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = userAccountCI;
      return Promise.resolve(true);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should find tickets by project id', async () => {
    const fakeProjectId = 0;
    const listType = TicketListType.list;

    const findManyByProjectIdFunc = jest.spyOn(
      ticketService,
      'findManyByProjectId',
    );
    findManyByProjectIdFunc.mockImplementationOnce(() => Promise.resolve([]));

    const { body } = await request(app.getHttpServer())
      .get(`/tickets?projectId=${fakeProjectId}&listType=${listType}`)
      .send()
      .expect(200);

    expect(findManyByProjectIdFunc).toHaveBeenCalledTimes(1);
    expect(findManyByProjectIdFunc).toHaveBeenCalledWith(
      fakeProjectId,
      listType,
    );
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

  it('Should find ticket by id', async () => {
    const taskId = 0;
    const fakeProjectId = 0;

    const findByIdFunc = jest.spyOn(ticketService, 'findById');
    findByIdFunc.mockImplementationOnce(() => Promise.resolve({} as any));

    const { body } = await request(app.getHttpServer())
      .get(`/tickets/${fakeProjectId}/${taskId}`)
      .send()
      .expect(200);

    expect(findByIdFunc).toHaveBeenCalledTimes(1);
    expect(findByIdFunc).toHaveBeenCalledWith(taskId);
  });

  afterAll(async () => {
    await conn.disconnect();
  });
});
