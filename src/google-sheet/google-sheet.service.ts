import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { cwd } from 'process';
import { google } from 'googleapis';
import { Compute } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1NIudgHff593162F-7X1K241Ihv_TuvG8p-AQSQrwL_M';
const TOKEN_PATH = path.join(cwd(), 'token.json');
const DATALAYER_TITLE = 'dataLayer Specs';

@Injectable()
export class GoogleSheetService {
  /**
   * Load or request or authorization to call APIs.
   *
   */
  async authorize() {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES,
      keyFile: TOKEN_PATH,
    });

    const authClient = await auth.getClient();
    return authClient;
  }

  async listSpecs(auth: JSONClient | Compute, range: string) {
    const sheets = google.sheets({ version: 'v4', auth });
    const emptyTable: any[][] = [];

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return emptyTable;
    }
    return rows;
  }

  getSpecs(rawStringSpecs: string) {
    const result = rawStringSpecs
      .split('(')[1]
      .split(')')[0]
      .replace(/\n/g, '');
    return result;
  }

  isValidJson(json: string) {
    try {
      JSON.parse(json);
    } catch (e) {
      console.log(e);
      console.log(json);
      return false;
    }
    return true;
  }
}
