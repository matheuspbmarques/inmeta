import { Provider } from '@nestjs/common';
import { MODEL, PROVIDE } from '../utils/constants';
import { Connection } from 'mongoose';
import { ContributorSchema } from './contributor.schema';

export const contributorsProviders: Array<Provider> = [
  {
    provide: PROVIDE.CONTRIBUTOR,
    useFactory: (connection: Connection) =>
      connection.model(MODEL.CONTRIBUTOR, ContributorSchema),
    inject: [PROVIDE.DATABASE],
  },
];
