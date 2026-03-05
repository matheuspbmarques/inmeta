import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { documentsProviders } from './documents.providers';
import { ContributorsModule } from '../contributors/contributors.module';

@Module({
  imports: [ContributorsModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, ...documentsProviders],
})
export class DocumentsModule {}
