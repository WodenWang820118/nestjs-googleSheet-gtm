import { Test, TestingModule } from '@nestjs/testing';
import { GtmService } from './gtm.service';

describe('GtmService', () => {
  let service: GtmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GtmService],
    }).compile();

    service = module.get<GtmService>(GtmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
