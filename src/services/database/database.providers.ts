import mongoose, { Mongoose } from 'mongoose';
import { PROVIDE } from '@utils/constants';
import { ENV } from '@utils/env';
import { Provider } from '@nestjs/common';

export const databaseProviders: Array<Provider> = [
  {
    provide: PROVIDE.DATABASE,
    useFactory: (): Promise<Mongoose> => mongoose.connect(ENV.MONGO_URI),
  },
];
