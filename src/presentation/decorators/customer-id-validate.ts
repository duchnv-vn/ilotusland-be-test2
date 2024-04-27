import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { CustomerRepository } from '../../infrastructure/repositories/customer/customer.repository';

@ValidatorConstraint({ name: 'CustomerExists', async: true })
@Injectable()
export class CustomerExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async validate(value: number) {
    if (!value) return true;
    try {
      const customer = await this.customerRepository.findById(value);
      return !!customer;
    } catch {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return RequestExceptionEnum.CUSTOMER_ID_NOT_EXIST;
  }
}
