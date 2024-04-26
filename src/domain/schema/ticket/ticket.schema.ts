import { Schema } from 'mongoose';
import { ModelName } from '../../../common/constants';
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
    reporter: {
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
      type: String,
      ref: ModelName.PROJECT,
    },
    priority: {
      type: String,
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
