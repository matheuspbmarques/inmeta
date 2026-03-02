import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { documentsProviders } from './documents.providers';
import { contributorsProviders } from 'src/contributors/contributors.providers';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    ...documentsProviders,
    ...contributorsProviders,
  ],
})
export class DocumentsModule {}
