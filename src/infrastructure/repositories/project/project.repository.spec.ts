import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { ProjectRepository } from './project.repository';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { ProjectRepositoryModule } from './project.module';

describe('ProjectRepository', () => {
  let projectRepository: ProjectRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        ProjectRepositoryModule,
      ],
      providers: [],
    }).compile();

    projectRepository = module.get<ProjectRepository>(ProjectRepository);
  });

  it('Should be defined', () => {
    expect(projectRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
