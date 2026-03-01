import { Test, TestingModule } from '@nestjs/testing';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { contributorsProviders } from './contributors.providers';
import { DatabaseModule } from '../../services/database/database.module';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

describe('Contributors', () => {
  let contributorController: ContributorsController;
  let contributorModule: TestingModule;

  beforeAll(async () => {
    contributorModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot()],
      controllers: [ContributorsController],
      providers: [ContributorsService, ...contributorsProviders],
    }).compile();

    contributorController = contributorModule.get<ContributorsController>(
      ContributorsController,
    );
  });

  describe('createContributor', () => {
    it('should create a contributor', async () => {
      const result = await contributorController.createContributor({
        name: 'John Doe',
      });

      expect(result).toHaveProperty('name', 'John Doe');
    });
  });

  afterAll(async () => {
    await contributorModule?.close();
    await mongoose.disconnect();
  });
});
