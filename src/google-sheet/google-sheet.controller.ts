import { Controller, Get } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';

@Controller('google-sheet')
export class GoogleSheetController {
  constructor(private readonly googleSheetService: GoogleSheetService) {}

  @Get('/specs')
  async readGoogleSheet(): Promise<any> {
    const auth = await this.googleSheetService.authorize();
    const range = await this.googleSheetService.getSpecsRange();
    console.log(`The specs range is ${range}; please specify it in .env`);
    const content = await this.googleSheetService.getSheet(auth, range);
    // checkpoint for debugging, rawSpecs not freindly sometimes from the sheet
    const rawSpecs = this.googleSheetService.getRawSpecs(content);
    const specs = this.googleSheetService.getJsonSpecs(rawSpecs);
    return specs;
  }
}
