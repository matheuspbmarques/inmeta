import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AddDocumentDto } from './dtos/add-document.dto';
import { DOCUMENT_TYPES, PROVIDE } from '../utils/constants';
import { Model } from 'mongoose';
import { Document } from './document.interface';
import { ContributorsRepository } from '../contributors/contributors.repository';
import { Contributor } from '../contributors/contributor.interface';
import { GetDocumentsPendingQueryDto } from './dtos/get-documents-peding-query.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(PROVIDE.DOCUMENT) private readonly documentModel: Model<Document>,
    private readonly contributorsRepository: ContributorsRepository,
  ) {}

  public async addDocument(addDocumentDto: AddDocumentDto): Promise<Document> {
    const contributorExists =
      await this.contributorsRepository.findOneContributor({
        id: addDocumentDto.contributorId,
      });

    if (!contributorExists) {
      throw new HttpException(
        { message: 'Contributor not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const session = await this.documentModel.startSession();

    session.startTransaction();

    try {
      // Deactivate existing active document
      await this.documentModel.findOneAndUpdate(
        {
          contributorId: addDocumentDto.contributorId,
          type: addDocumentDto.type,
        },
        {
          isActive: false,
        },
        { session },
      );

      // Add the new document
      const createdDocument = new this.documentModel(
        { url: 'URL do arquivo', ...addDocumentDto },
        null,
        {
          session,
        },
      );

      await session.commitTransaction();

      return createdDocument.save();
    } catch (error) {
      await session.abortTransaction();

      console.error('Error adding document:', error);

      throw new HttpException(
        { message: 'Failed to add document' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await session.endSession();
    }
  }

  public async getDocumentsPending({
    name,
    documents,
    page,
    limit,
  }: GetDocumentsPendingQueryDto) {
    const contributorsWithDocuments =
      await this.contributorsRepository.getContributorsWithDocuments({
        name,
        documents,
        skip: (page - 1) * limit,
        limit,
      });

    const pendingDocuments: Array<{
      contributorId: Contributor['_id'];
      document: Record<string, null>;
    }> = contributorsWithDocuments
      .map(({ _id, name, documents: contributorDocuments }) => {
        const document: Record<string, null> = {};

        DOCUMENT_TYPES.forEach((type) => {
          const documentExists = contributorDocuments.find(
            (contributorDocument) => contributorDocument.type === type,
          );

          if (
            (!documentExists && !documents) ||
            (!documentExists && documents && documents.includes(type))
          ) {
            document[type] = null;
          }
        });

        return {
          contributorId: _id,
          contributorName: name,
          document,
        };
      })
      .filter(({ document }) => Object.keys(document).length > 0);

    return pendingDocuments;
  }
}
