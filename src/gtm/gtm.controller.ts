import { Controller, Get } from '@nestjs/common';
import { GtmService } from './gtm.service';

@Controller('gtm')
export class GtmController {
  constructor(private readonly gtmService: GtmService) {}

  @Get('/accounts')
  async listAccounts() {
  }
}
