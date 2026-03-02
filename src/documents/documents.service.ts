import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AddDocumentDto } from './dtos/add-document.dto';
import { PROVIDE } from 'src/utils/constants';
import { Model } from 'mongoose';
import { Document } from './document.interface';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(PROVIDE.DOCUMENT) private readonly documentModel: Model<Document>,
    @Inject(PROVIDE.CONTRIBUTOR)
    private readonly contributorModel: Model<Document>,
  ) {}

  public async addDocument(addDocumentDto: AddDocumentDto): Promise<Document> {
    const contributorExists = await this.contributorModel.exists({
      _id: addDocumentDto.contributorId,
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
}
