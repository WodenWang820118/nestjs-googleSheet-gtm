import { Module } from '@nestjs/common';
import { GtmController } from './gtm.controller';
import { GtmService } from './gtm.service';

@Module({
  controllers: [GtmController],
  providers: [GtmService],
  exports: [GtmService],
})
export class GtmModule {}
