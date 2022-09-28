import { Controller, Get } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';

@Controller('google-sheet')
export class GoogleSheetController {
  constructor(private readonly googleSheetService: GoogleSheetService) {}

  @Get('/specs')
  async readGoogleSheet(): Promise<any> {
    const auth = await this.googleSheetService.authorize();
    // a set of ranges to be read from the google sheet
    const specsRange = await this.googleSheetService.getSpecsRange('dataLayer Specs');
    const tagnameRange = await this.googleSheetService.getSpecsRange('tag name');

    console.log(`The specs range is ${specsRange}; please specify title in .env`);
    console.log(`The tagname range is ${tagnameRange}; please specify title in .env`);

    const specsContent = await this.googleSheetService.getColData(auth, specsRange);
    const tagnameContent = await this.googleSheetService.getColData(auth, tagnameRange);

    // checkpoint for debugging, rawSpecs not freindly sometimes from the sheet
    const rawSpecs = this.googleSheetService.getRawSpecs(specsContent);
    const rawTagnames = this.googleSheetService.getRawTagnames(tagnameContent);

    const results = this.googleSheetService.getJsonSpecs(rawSpecs, rawTagnames);
    return results;
  }
}
