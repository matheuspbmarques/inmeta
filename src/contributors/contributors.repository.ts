import { Inject, Injectable } from '@nestjs/common';
import { Model, PipelineStage } from 'mongoose';
import { PROVIDE } from '../utils/constants';
import { Contributor } from './contributor.interface';
import { Document } from '../documents/document.interface';
import { DocumentType } from '../types';

@Injectable()
export class ContributorsRepository {
  constructor(
    @Inject(PROVIDE.CONTRIBUTOR)
    private readonly contributorModel: Model<Contributor>,
  ) {}

  public async getContributorsWithDocuments(options?: {
    name?: string;
    documents?: Array<DocumentType>;
    skip?: number;
    limit?: number;
  }) {
    const aggregation: Array<PipelineStage> = [
      {
        $lookup: {
          from: 'documents',
          let: { contributorId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$contributorId', '$$contributorId'] },
                    { $ne: ['$isActive', false] },
                  ],
                },
              },
            },
          ],
          as: 'documents',
        },
      },
    ];

    if (options?.name) {
      aggregation.push({
        $match: {
          name: { $regex: options.name, $options: 'i' },
        },
      });
    }

    if (options?.documents) {
      aggregation.push({
        $match: {
          'documents.type': { $not: { $in: options.documents } },
        },
      });
    }

    if (options?.skip) aggregation.push({ $skip: options.skip });

    if (options?.limit) aggregation.push({ $limit: options.limit });

    console.log('aggregation', aggregation);
    console.log('documents', options?.documents);

    return await this.contributorModel.aggregate<
      Contributor & { documents: Array<Document> }
    >(aggregation);
  }

  public async findOneContributor({
    id,
  }: {
    id: Contributor['_id'];
  }): Promise<Contributor | null> {
    return await this.contributorModel.findById(id).exec();
  }
}
