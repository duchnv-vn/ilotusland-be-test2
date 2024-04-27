import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { ProjectRepository } from '../../infrastructure/repositories/project/project.repository';

@ValidatorConstraint({ name: 'ProjectExists', async: true })
@Injectable()
export class ProjectExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async validate(value: number) {
    if (!value) return true;
    try {
      const project = await this.projectRepository.findById(value);
      return !!project;
    } catch {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return RequestExceptionEnum.PROJECT_ID_NOT_EXIST;
  }
}
