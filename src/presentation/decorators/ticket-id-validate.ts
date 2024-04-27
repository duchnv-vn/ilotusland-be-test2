import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { TicketRepository } from '../../infrastructure/repositories/ticket/ticket.repository';

@ValidatorConstraint({ name: 'TicketExists', async: true })
@Injectable()
export class TicketExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async validate(value: number) {
    if (!value) return true;
    try {
      const project = await this.ticketRepository.findById(value);
      return !!project;
    } catch {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return RequestExceptionEnum.TICKET_ID_NOT_EXIST;
  }
}
