import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { Company } from '../../../domain/schema/company/company.interface';
import { ModelName } from '../../../common/enum/collection';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(
    @Inject(ModelName.COMPANY)
    protected readonly model: Model<Company>,
  ) {
    super(model);
  }
}
