import { WithTimestamps, Document as DocumentMongoose } from 'mongoose';
import { Contributor } from 'src/contributors/contributor.interface';

export interface Document extends WithTimestamps<DocumentMongoose> {
  contributorId: Contributor['_id'];
  name: string;
  url: string;
  type: string;
  isActive: boolean;
}
