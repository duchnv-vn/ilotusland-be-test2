import { IBaseSchema } from '../../domain/schema/base';
import { Company } from '../../domain/schema/company/company.interface';
import { Customer } from '../../domain/schema/customer/customer.interface';
import { User } from '../../domain/schema/user/user.interface';
import { TicketAttachedFile } from '../../domain/type/ticketAttachedFile.type';

export interface FindTicketDetail extends IBaseSchema {
  title: string;
  description: string;
  asignee: Pick<User, 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, 'name' | 'avatarUrl' | 'email'>;
  customerId: Pick<Customer, 'name' | 'phoneNumber'>;
  companyId: Pick<Company, 'name' | 'address'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
  dueDate: number;
  attachedFiles: TicketAttachedFile[];
  createdUser: Pick<User, 'name' | 'avatarUrl' | 'email'>;
}

export interface FindTicketsByProjectBoard {
  _id: number;
  title: string;
  asignee: Pick<User, 'name' | 'avatarUrl' | 'email'>;
  reporter: Pick<User, 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  requestTypeId: number;
  priority: number;
  timeTracking: number;
}

export interface FindTicketsByProjectList {
  _id: number;
  title: string;
  asignee: Pick<User, 'name' | 'avatarUrl' | 'email'>;
  stageId: number;
  priority: number;
  dueDate: number;
}
