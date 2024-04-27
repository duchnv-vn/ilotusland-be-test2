import { Module } from '@nestjs/common';
import { MongodbModule } from '../../database/database.module';
import { CollectionName, ModelName } from '../../../common/enum/collection';
import { CustomerRepository } from './customer.repository';
import { CustomerSchema } from '../../../domain/schema/customer/customer.schema';

@Module({
  imports: [
    MongodbModule.forFeature([
      {
        provide: ModelName.CUSTOMER,
        schema: CustomerSchema,
        collection: CollectionName[ModelName.CUSTOMER],
      },
    ]),
  ],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class CustomerRepositoryModule {}
