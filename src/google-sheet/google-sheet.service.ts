import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { cwd } from 'process';
import { Compute } from 'google-auth-library';
import { google } from 'googleapis';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(cwd(), 'token.json'); // for authentication

@Injectable()
export class GoogleSheetService {
  private getSpecs(rawStringSpecs: string): string {
    // TODO: might be more complicated string to be parsed
    const result = rawStringSpecs
      .split('(')[1]
      .split(')')[0]
      .replace(/\n/g, '');
    return result;
  }

  private isValidJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      console.log(e);
      console.log(json);
      return false;
    }
    return true;
  }

  async authorize() {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES,
      keyFile: TOKEN_PATH,
    });

    return await auth.getClient();
  }

  async getSheet(auth: JSONClient | Compute, range: string) {
    const sheets = google.sheets({ version: 'v4', auth });
    const emptyTable: string[][] = [];

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
    });

    const table = res.data.values;
    if (!table || table.length === 0) {
      console.log('No data found.');
      return emptyTable;
    }
    return table;
  }

  // TODO: might use an interface since every project gets a different sheet name
  getSheetName() {
    // TODO: dynamic sheet name based on the project
    return process.env.SHEET_NAME;
  }

  async getSpecsRange(): Promise<string> {
    const sheetName = this.getSheetName(); // 'Sheet1' to retrive all ranges
    const auth = await this.authorize();
    const sheet = await this.getSheet(auth, sheetName);

    for (let col = 0; col < sheet[0].length; col++) {
      if (sheet[0][col].includes('dataLayer Specs')) {
        const startCell = String.fromCharCode(65 + col) + '2';
        const endCell = String.fromCharCode(65 + col) + sheet.length;
        return `${sheetName}!${startCell}:${endCell}`;
      }
    }
  }

  getRawSpecs(content: any[][]): string[] {
    const rawSpecs = [];
    for (let row = 0; row < content.length; row++) {
      for (let col = 0; col < content[row].length; col++) {
        if (content[row][col].includes('window')) {
          rawSpecs.push(content[row][col]);
        }
      }
    }
    return rawSpecs;
  }

  getJsonSpecs(rawSpecs: string[]): string {
    const specs = [];
    for (let i = 0; i < rawSpecs.length; i++) {
      const result = this.getSpecs(rawSpecs[i]);
      if (this.isValidJson(result)) {
        specs.push(JSON.parse(result));
      }
    }
    return JSON.stringify(specs);
  }
}
