import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { CollectionName, ModelName } from '../../../common/constants';
import { ProjectMemberRepository } from './projectMember.repository';
import { ProjectMemberSchema } from '../../../domain/schema/projectMember/projectMember.schema';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.PROJECT_MEMBER,
        schema: ProjectMemberSchema,
        collection: CollectionName[ModelName.PROJECT_MEMBER],
      },
    ]),
  ],
  providers: [ProjectMemberRepository],
  exports: [ProjectMemberRepository],
})
export class ProjectMemberRepositoryModule {}
