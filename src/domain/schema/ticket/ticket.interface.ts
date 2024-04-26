import { TicketPriorityType } from '../../enum/ticket-priority';
import { TypeOfTicketRequestType } from '../../enum/ticket-request-type';
import { AttachedFile, IBaseSchema } from '../base';

export interface Ticket extends IBaseSchema {
  title: string;
  asigneeId: number;
  customerId: number;
  description: string;
  requestType: TypeOfTicketRequestType;
  priority: TicketPriorityType;
  attachedFiles: AttachedFile[];
}
