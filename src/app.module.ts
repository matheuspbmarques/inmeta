import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContributorsModule } from './contributors/contributors.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ContributorsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
