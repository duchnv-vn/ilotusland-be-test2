import { Schema } from 'mongoose';
import { ModelName } from '../../../common/enum/collection';

export const ProjectMemberSchema = new Schema(
  {
    _id: Number,
    projectId: {
      type: Number,
      ref: ModelName.PROJECT,
    },
    userId: {
      type: Number,
      ref: ModelName.USER,
    },
  },
  { timestamps: false },
);

ProjectMemberSchema.index(
  {
    projectId: 1,
    userId: 1,
  },
  {
    name: 'projectId_2024-04-27',
    unique: true,
  },
);
