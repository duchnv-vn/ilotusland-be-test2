import { HydratedDocument } from 'mongoose';
import { IBaseSchemaCommon } from '../base';

export interface Customer extends IBaseSchemaCommon {
  name: string;
  phoneNumber: string;
}

export type CustomerDocument = HydratedDocument<Customer>;
