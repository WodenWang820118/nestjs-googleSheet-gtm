import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetService } from './google-sheet.service';

describe('GoogleSheetService', () => {
  let service: GoogleSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetService],
    }).compile();

    service = module.get<GoogleSheetService>(GoogleSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
