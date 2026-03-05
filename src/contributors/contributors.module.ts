import { Module } from '@nestjs/common';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { contributorsProviders } from './contributors.providers';
import { ContributorsRepository } from './contributors.repository';

@Module({
  controllers: [ContributorsController],
  providers: [
    ContributorsService,
    ...contributorsProviders,
    ContributorsRepository,
  ],
  exports: [ContributorsRepository],
})
export class ContributorsModule {}
