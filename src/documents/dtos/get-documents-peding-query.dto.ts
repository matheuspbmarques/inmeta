import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DOCUMENT_TYPES } from '../../utils/constants';
import { DocumentType } from '../../types';

export class GetDocumentsPendingQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((item: string) => item.trim()),
  )
  @IsArray()
  @IsEnum(DOCUMENT_TYPES, { each: true })
  documents?: Array<DocumentType>;

  @IsNumber()
  page: number;

  @IsNumber()
  @Min(10)
  @Max(25)
  limit: number;
}
