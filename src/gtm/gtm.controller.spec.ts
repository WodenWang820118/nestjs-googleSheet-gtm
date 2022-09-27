import { Test, TestingModule } from '@nestjs/testing';
import { GtmController } from './gtm.controller';

describe('GtmController', () => {
  let controller: GtmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GtmController],
    }).compile();

    controller = module.get<GtmController>(GtmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
