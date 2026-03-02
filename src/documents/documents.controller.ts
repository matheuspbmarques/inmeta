import { Body, Controller, Post } from '@nestjs/common';
import { AddDocumentDto } from './dtos/add-document.dto';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post()
  public async addDocument(@Body() addDocumentDto: AddDocumentDto) {
    return await this.documentsService.addDocument(addDocumentDto);
  }
}
