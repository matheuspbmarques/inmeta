import { Document, WithTimestamps } from 'mongoose';

export interface Contributor extends WithTimestamps<Document> {
  readonly name: string;
}
