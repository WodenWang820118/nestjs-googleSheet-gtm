import { Controller, Get } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';

@Controller('google-sheet')
export class GoogleSheetController {
  constructor(private readonly googleSheetService: GoogleSheetService) {}

  @Get('/specs')
  async readGoogleSheet(): Promise<any> {
    // TODO: locate for the range in the google sheet
    // should be a specified sheet name with title keyword and translate it into a range
    const range = 'Sheet1!A:A';
    const rawSpecs = [];
    const specs = [];

    const auth = await this.googleSheetService.authorize();
    const content = await this.googleSheetService.listSpecs(auth, range);

    for (let row = 0; row < content.length; row++) {
      for (let col = 0; col < content[row].length; col++) {
        if (content[row][col].startsWith('window')) {
          rawSpecs.push(content[row][col]);
        }
      }
    }

    for (let i = 0; i < rawSpecs.length; i++) {
      const result = this.googleSheetService.getSpecs(rawSpecs[i]);
      if (this.googleSheetService.isValidJson(result)) {
        specs.push(JSON.parse(result));
      }
    }

    return JSON.stringify(specs);
  }
}
