import { ConfigModule } from '@nestjs/config';
import { DocumentsController } from './documents.controller';
import { documentsProviders } from './documents.providers';
import { DocumentsService } from './documents.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ContributorsModule } from '../contributors/contributors.module';
import { DatabaseModule } from '../database/database.module';
import mongoose from 'mongoose';

describe('Documents', () => {
  let documentsModule: TestingModule;
  let documentsController: DocumentsController;

  beforeAll(async () => {
    documentsModule = await Test.createTestingModule({
      imports: [ContributorsModule, ConfigModule.forRoot(), DatabaseModule],
      controllers: [DocumentsController],
      providers: [DocumentsService, ...documentsProviders],
    }).compile();

    documentsController =
      documentsModule.get<DocumentsController>(DocumentsController);
  });

  describe('getDocumentsPending', () => {
    it('should return an array of documents', async () => {
      const result = await documentsController.getDocumentsPending({
        page: 1,
        limit: 10,
      });

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  afterAll(async () => {
    await documentsModule?.close();
    await mongoose.disconnect();
  });
});
