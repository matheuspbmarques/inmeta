import mongoose, { Mongoose } from 'mongoose';
import { PROVIDE } from '../utils/constants';
import { Provider } from '@nestjs/common';

export const databaseProviders: Array<Provider> = [
  {
    provide: PROVIDE.DATABASE,
    useFactory: (): Promise<Mongoose> => {
      if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not defined');
      }

      return mongoose.connect(process.env.MONGO_URI);
    },
  },
];
