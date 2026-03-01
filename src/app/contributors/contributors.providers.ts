import { Provider } from '@nestjs/common';
import { PROVIDE } from '../../utils/constants';
import { Connection } from 'mongoose';
import { ContributorSchema } from './contributor.schema';

export const contributorsProviders: Array<Provider> = [
  {
    provide: PROVIDE.CONTRIBUTOR,
    useFactory: (connection: Connection) =>
      connection.model('Contributor', ContributorSchema),
    inject: [PROVIDE.DATABASE],
  },
];
