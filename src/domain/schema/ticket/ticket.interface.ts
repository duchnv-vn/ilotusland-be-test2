import { HydratedDocument } from 'mongoose';
import { TicketPriority } from '../../enum/ticket-priority';
import { IBaseSchema } from '../base';
import { TicketAttachedFile } from '../../type/ticketAttachedFile.type';

export interface Ticket extends IBaseSchema {
  title: string;
  projectId: number;
  asigneeId: number;
  reporterId: number;
  customerId: number;
  companyId: number;
  stageId: number;
  description: string;
  requestTypeId: number;
  priority: TicketPriority;
  timeTracking: number;
  dueDate: number;
  attachedFiles: TicketAttachedFile[];
  createdBy: number;
  deleteFlag: number;
}

export type TicketDocument = HydratedDocument<Ticket>;
