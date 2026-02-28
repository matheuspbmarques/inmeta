import { Module } from '@nestjs/common';
import { databaseProviders } from '@services/database/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
