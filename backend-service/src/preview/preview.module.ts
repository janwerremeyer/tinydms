import { Module } from '@nestjs/common';
import { PdfpreviewService } from './pdfpreview.service';
import { PreviewController } from './preview.controller';
import {StorageModule} from "../storage/storage.module";

@Module({
  providers: [PdfpreviewService],
  controllers: [PreviewController],
  imports:[StorageModule]
})
export class PreviewModule {}
