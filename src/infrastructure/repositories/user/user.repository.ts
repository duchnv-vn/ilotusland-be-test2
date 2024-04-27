import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { ModelName } from '../../../common/enum/collection';
import { User } from '../../../domain/schema/user/user.interface';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject(ModelName.USER)
    protected readonly model: Model<User>,
  ) {
    super(model);
  }
}
