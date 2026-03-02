import { Inject, Injectable } from '@nestjs/common';
import { CreateContributorDto } from './dtos/create-contributor.dto';
import { Contributor } from './contributor.interface';
import { PROVIDE } from '../utils/constants';
import { Model } from 'mongoose';
import { FindOneContributorDto } from './dtos/find-one-contributor.dto';

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

  public async findOneContributor({
    id,
  }: FindOneContributorDto): Promise<Contributor | null> {
    return this.contributorModel.findById(id);
  }
}
