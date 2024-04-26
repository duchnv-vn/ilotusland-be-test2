import { Schema } from 'mongoose';

export const CustomerSchema = new Schema(
  {
    _id: Number,
    name: String,
    phoneNumber: String,
  },
  { timestamps: false },
);
