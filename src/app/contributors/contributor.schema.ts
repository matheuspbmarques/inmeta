import { Schema } from 'mongoose';

export const ContributorSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);
