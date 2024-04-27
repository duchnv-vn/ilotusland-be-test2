import { HydratedDocument } from 'mongoose';
import { IBaseSchema } from '../base';
import { ProjectStage } from '../../type/projectStage.type';
import { ProjectRequestType } from '../../type/projectRequestType.type';

export interface Project extends IBaseSchema {
  name: string;
  logoUrl: string;
  stages: ProjectStage[];
  requestTypes: ProjectRequestType[];
}

export type ProjectDocument = HydratedDocument<Project>;
