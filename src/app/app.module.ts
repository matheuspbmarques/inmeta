import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContributorsModule } from './contributors/contributors.module';
import { DatabaseModule } from '../services/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ContributorsModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
