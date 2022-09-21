import { Module } from '@nestjs/common';
import { GoogleSheetModule } from './google-sheet/google-sheet.module';

@Module({
  imports: [GoogleSheetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
