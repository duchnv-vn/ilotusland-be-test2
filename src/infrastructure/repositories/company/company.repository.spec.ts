import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { CompanyRepository } from './company.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { CompanyRepositoryModule } from './company.module';

describe('CompanyRepository', () => {
  let companyRepository: CompanyRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        CompanyRepositoryModule,
      ],
      providers: [],
    }).compile();

    companyRepository = module.get<CompanyRepository>(CompanyRepository);
  });

  it('Should be defined', () => {
    expect(companyRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
