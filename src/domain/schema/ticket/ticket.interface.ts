import { HydratedDocument } from 'mongoose';
import { TicketPriorityType } from '../../enum/ticket-priority';
import { IBaseSchema } from '../base';
import { TicketAttachedFile } from '../../type/ticketAttachedFile.type';

export interface Ticket extends IBaseSchema {
  title: string;
  projectId: number;
  asigneeId: number;
  reporter: number;
  customerId: number;
  companyId: number;
  stageId: number;
  description: string;
  requestTypeId: number;
  priority: TicketPriorityType;
  timeTracking: number;
  dueDate: number;
  attachedFiles: TicketAttachedFile[];
  createdBy: number;
}

export type TicketDocument = HydratedDocument<Ticket>;
