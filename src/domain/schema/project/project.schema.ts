import { Schema } from 'mongoose';
import { ProjectStage } from '../../type/projectStage.type';
import { ProjectRequestType } from '../../type/projectRequestType.type';

export const ProjectSchema = new Schema(
  {
    _id: Number,
    logoUrl: String,
    stages: {
      type: [ProjectStage],
      default: undefined,
    },
    requestTypes: {
      type: [ProjectRequestType],
      default: undefined,
    },
  },
  { timestamps: true },
);
