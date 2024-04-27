import { Schema } from 'mongoose';
import { ModelName } from '../../../common/enum/collection';
import { TicketPriority } from '../../enum/ticket-priority';

export const TicketSchema = new Schema(
  {
    _id: Number,
    title: String,
    projectId: {
      type: Number,
      ref: ModelName.PROJECT,
    },
    asigneeId: {
      type: Number,
      ref: ModelName.USER,
    },
    reporterId: {
      type: Number,
      ref: ModelName.USER,
    },
    customerId: {
      type: Number,
      ref: ModelName.CUSTOMER,
    },
    companyId: {
      type: Number,
      ref: ModelName.COMPANY,
    },
    stageId: {
      type: Number,
      ref: ModelName.PROJECT,
    },
    description: String,
    requestTypeId: {
      type: Number,
      ref: ModelName.PROJECT,
    },
    priority: {
      type: Number,
      enum: TicketPriority,
    },
    timeTracking: Number,
    dueDate: Number,
    attachedFiles: {
      type: [
        {
          name: String,
          type: String,
          url: String,
        },
      ],
      default: undefined,
    },
    createdBy: {
      type: Number,
      ref: ModelName.USER,
    },
    deleteFlag: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

TicketSchema.index(
  {
    projectId: 1,
  },
  {
    name: 'projectId_2024-04-26',
  },
);
