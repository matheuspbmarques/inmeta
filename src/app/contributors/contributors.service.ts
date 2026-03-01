import { Inject, Injectable } from '@nestjs/common';
import { CreateContributorDto } from './dtos/create-contributor.dto';
import { Contributor } from './contributor.interface';
import { PROVIDE } from '../../utils/constants';
import { Model } from 'mongoose';

@Injectable()
export class ContributorsService {
  constructor(
    @Inject(PROVIDE.CONTRIBUTOR)
    private readonly contributorModel: Model<Contributor>,
  ) {}

  public async createContributor({
    name,
  }: CreateContributorDto): Promise<Contributor> {
    const createdContributor = new this.contributorModel({ name });

    return createdContributor.save();
  }
}
