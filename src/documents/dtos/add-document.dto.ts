import { Types } from 'mongoose';
import { IsEnum, IsMongoId } from 'class-validator';
import { DOCUMENT_TYPES } from '../../utils/constants';

export class AddDocumentDto {
  @IsMongoId()
  contributorId: Types.ObjectId;

  @IsEnum(DOCUMENT_TYPES)
  type: string;
}
