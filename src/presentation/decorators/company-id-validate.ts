import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { CompanyRepository } from '../../infrastructure/repositories/company/company.repository';

@ValidatorConstraint({ name: 'CompanyExists', async: true })
@Injectable()
export class CompanyExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async validate(value: number) {
    try {
      const company = await this.companyRepository.findById(value);
      return !!company;
    } catch {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return RequestExceptionEnum.COMPANY_ID_NOT_EXIST;
  }
}
