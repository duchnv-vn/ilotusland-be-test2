import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { MongodbModule } from '../../database/database.module';
import { MONGODB_URI } from '../../../configs/envs';
import { ProjectMemberRepositoryModule } from './projectMember.module';
import { ProjectMemberRepository } from './projectMember.repository';

describe('ProjectMemberRepository', () => {
  let projectMemberRepository: ProjectMemberRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongodbModule.forRoot(MONGODB_URI, {
          user: '',
          pass: '',
          dbName: '',
          authSource: undefined,
        }),
        ProjectMemberRepositoryModule,
      ],
      providers: [],
    }).compile();

    projectMemberRepository = module.get<ProjectMemberRepository>(
      ProjectMemberRepository,
    );
  });

  it('Should be defined', () => {
    expect(projectMemberRepository).toBeDefined();
  });

  afterAll(async () => {
    await disconnect();
  });
});
