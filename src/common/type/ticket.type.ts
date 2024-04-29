import { IBaseSchema } from '../../domain/schema/base';
import { Company } from '../../domain/schema/company/company.interface';
import { Customer } from '../../domain/schema/customer/customer.interface';
import { User } from '../../domain/schema/user/user.interface';
import { TicketAttachedFile } from '../../domain/type/ticketAttachedFile.type';

export interface FindTicketDetail extends IBaseSchema {
  title: string;
  description: string;
  asignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  customer: Pick<Customer, '_id' | 'name' | 'phoneNumber'>;
  company: Pick<Company, '_id' | 'name' | 'address'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
  dueDate: number;
  attachedFiles: TicketAttachedFile[];
  createdUser: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
}

export interface FindTicketsByProjectBoard extends IBaseSchema {
  title: string;
  asignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
  dueDate: number;
}

export interface FindTicketsByProjectList extends IBaseSchema {
  title: string;
  asignee: Pick<User, '_id' | 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  priority: number;
  dueDate: number;
}
