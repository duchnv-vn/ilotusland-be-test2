import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/enum/collection';
import { Customer } from '../../../domain/schema/customer/customer.interface';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(
    @Inject(ModelName.CUSTOMER)
    protected readonly model: Model<Customer>,
  ) {
    super(model);
  }
}
