import { Module } from '@nestjs/common';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { contributorsProviders } from './contributors.providers';

@Module({
  controllers: [ContributorsController],
  providers: [ContributorsService, ...contributorsProviders],
  exports: [ContributorsService],
})
export class ContributorsModule {}
