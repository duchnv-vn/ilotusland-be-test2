import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { CollectionName, ModelName } from '../../../common/constants';
import { ProjectRepository } from './project.repository';
import { ProjectSchema } from '../../../domain/schema/project/project.schema';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.PROJECT,
        schema: ProjectSchema,
        collection: CollectionName[ModelName.PROJECT],
      },
    ]),
  ],
  providers: [ProjectRepository],
  exports: [ProjectRepository],
})
export class ProjectRepositoryModule {}
