import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    _id: Number,
    email: String,
    avatarUrl: String,
  },
  { timestamps: false },
);
