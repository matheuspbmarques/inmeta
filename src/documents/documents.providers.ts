import { Provider } from '@nestjs/common';
import { MODEL, PROVIDE } from '../utils/constants';
import { Connection } from 'mongoose';
import { DocumentSchema } from './document.schema';

export const documentsProviders: Array<Provider> = [
  {
    provide: PROVIDE.DOCUMENT,
    useFactory: (connection: Connection) =>
      connection.model(MODEL.DOCUMENT, DocumentSchema),
    inject: [PROVIDE.DATABASE],
  },
];
