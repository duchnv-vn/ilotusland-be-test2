import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../../infrastructure/repositories/user/user.repository';
import { RequestExceptionEnum } from '../../common/enum/exception';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(value: number) {
    if (!value) return true;

    try {
      const user = await this.userRepository.findById(value);
      return !!user;
    } catch {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    switch (args.property) {
      case 'asigneeId':
        return RequestExceptionEnum.ASSIGNEE_ID_NOT_EXIST;

      case 'reporterId':
        return RequestExceptionEnum.REPORTER_ID_NOT_EXIST;
    }
  }
}
