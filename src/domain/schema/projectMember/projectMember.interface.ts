import { HydratedDocument } from 'mongoose';
import { IBaseSchema } from '../base';

export interface ProjectMember extends IBaseSchema {
  projectId: number;
  userId: number;
}

export type ProjectMemberDocument = HydratedDocument<ProjectMember>;
