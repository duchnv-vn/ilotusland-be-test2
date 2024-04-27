import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { CustomerRepository } from './customer.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { CustomerRepositoryModule } from './customer.module';

describe('CustomerRepository', () => {
  let customerRepository: CustomerRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        CustomerRepositoryModule,
      ],
      providers: [],
    }).compile();

    customerRepository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('Should be defined', () => {
    expect(customerRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
