import { Body, Controller, Post } from '@nestjs/common';
import { CreateContributorDto } from './dtos/create-contributor.dto';
import { ContributorsService } from './contributors.service';

@Controller('contributors')
export class ContributorsController {
  constructor(private readonly contributorsService: ContributorsService) {}

  @Post()
  public async createContributor(@Body() { name }: CreateContributorDto) {
    return await this.contributorsService.createContributor({ name });
  }
}
