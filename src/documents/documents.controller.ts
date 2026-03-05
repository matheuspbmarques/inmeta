import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddDocumentDto } from './dtos/add-document.dto';
import { DocumentsService } from './documents.service';
import { GetDocumentsPendingQueryDto } from './dtos/get-documents-peding-query.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post()
  public async addDocument(@Body() addDocumentDto: AddDocumentDto) {
    return await this.documentsService.addDocument(addDocumentDto);
  }

  @Get('/pending')
  public async getDocumentsPending(
    @Query() { name, documents, page, limit }: GetDocumentsPendingQueryDto,
  ) {
    return await this.documentsService.getDocumentsPending({
      name,
      documents,
      page,
      limit,
    });
  }
}
