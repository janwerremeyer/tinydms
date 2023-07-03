import { Test, TestingModule } from '@nestjs/testing';
import { PdfpreviewService } from './pdfpreview.service';

describe('PreviewService', () => {
  let service: PdfpreviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfpreviewService],
    }).compile();

    service = module.get<PdfpreviewService>(PdfpreviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
