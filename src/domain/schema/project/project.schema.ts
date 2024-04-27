import { Schema } from 'mongoose';

export const ProjectSchema = new Schema(
  {
    _id: Number,
    logoUrl: String,
    stages: {
      type: [
        {
          id: Number,
          name: String,
          order: Number,
        },
      ],
      default: undefined,
    },
    requestTypes: {
      type: [
        {
          id: Number,
          name: String,
        },
      ],
      default: undefined,
    },
  },
  { timestamps: true },
);
