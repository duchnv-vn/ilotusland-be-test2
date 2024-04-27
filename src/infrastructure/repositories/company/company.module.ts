import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { CollectionName, ModelName } from '../../../common/enum/collection';
import { CompanySchema } from '../../../domain/schema/company/company.schema';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.COMPANY,
        schema: CompanySchema,
        collection: CollectionName[ModelName.COMPANY],
      },
    ]),
  ],
  providers: [CompanyRepository],
  exports: [CompanyRepository],
})
export class CompanyRepositoryModule {}
