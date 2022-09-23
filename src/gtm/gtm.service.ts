import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.manage.accounts',
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.delete.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
  'https://www.googleapis.com/auth/tagmanager.manage.users',
  'https://www.googleapis.com/auth/tagmanager.publish',
];
@Injectable()
export class GtmService {
  async authorize() {
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES,
      keyFile: 'gtm_client_secrets.json',
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient }); // bind it to future calls
    return authClient;
  }

  async listAccounts(auth: any) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.list();
    return res.data;
  }

  async getAccountByPath(auth: any, path: string) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.get({ path: path });
    return res.data;
  }

  async getContainers(auth: any, path: string) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.containers.list({ parent: path });
    return res.data;
  }

  async getContainerByPath(auth: any, path: string) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.containers.get({
      path: path,
    });
    return res.data;
  }

  async getWorkspaces(auth: any, path: string) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.containers.workspaces.list({
      parent: path,
    });
    return res.data;
  }

  async getWorkspaceByPath(auth: any, path: string) {
    const gtm = google.tagmanager({ version: 'v2', auth });
    const res = await gtm.accounts.containers.workspaces.get({
      path: path,
    });
    return res.data;
  }
}
