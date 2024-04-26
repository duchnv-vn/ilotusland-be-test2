import { Schema } from 'mongoose';

export const CompanySchema = new Schema(
  {
    _id: Number,
    name: String,
    address: String,
  },
  { timestamps: false },
);
