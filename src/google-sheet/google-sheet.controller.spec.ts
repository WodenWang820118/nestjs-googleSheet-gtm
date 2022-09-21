import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetController } from './google-sheet.controller';

describe('GoogleSheetController', () => {
  let controller: GoogleSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleSheetController],
    }).compile();

    controller = module.get<GoogleSheetController>(GoogleSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
