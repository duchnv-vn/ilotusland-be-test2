import { HydratedDocument } from 'mongoose';
import { IBaseSchemaCommon } from '../base';

export interface Company extends IBaseSchemaCommon {
  name: string;
  address: string;
}

export type CompanyDocument = HydratedDocument<Company>;
