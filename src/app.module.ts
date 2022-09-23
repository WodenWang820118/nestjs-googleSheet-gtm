import { Module } from '@nestjs/common';
import { GoogleSheetModule } from './google-sheet/google-sheet.module';
import { GtmModule } from './gtm/gtm.module';

@Module({
  imports: [GoogleSheetModule, GtmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
