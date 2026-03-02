import { Schema } from 'mongoose';
import { Document } from './document.interface';
import { DOCUMENT_TYPES, MODEL } from 'src/utils/constants';

export const DocumentSchema = new Schema<Document>(
  {
    contributorId: {
      type: Schema.Types.ObjectId,
      ref: MODEL.CONTRIBUTOR,
      required: true,
    },
    type: { type: String, required: true, enum: DOCUMENT_TYPES },
    url: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);
