import { Controller, Get, Param } from '@nestjs/common';
import { GtmService } from './gtm.service';
@Controller('gtm')
export class GtmController {
  constructor(private readonly gtmService: GtmService) {}

  @Get('/accounts')
  async listAccounts() {
    const auth = await this.gtmService.authorize();
    const accounts = await this.gtmService.listAccounts(auth);
    return accounts;
  }

  @Get('/accounts/:accountPath')
  async getAccountByPath(@Param('accountPath') accountPath: string) {
    const auth = await this.gtmService.authorize();
    const path = `accounts/${accountPath}`;
    const accounts = await this.gtmService.getAccountByPath(auth, path);
    return accounts;
  }

  @Get('/accounts/:accountPath/containers')
  async listContainers(@Param('accountPath') accountPath: string) {
    const auth = await this.gtmService.authorize();
    const path = `accounts/${accountPath}`;
    const containers = await this.gtmService.getContainers(auth, path);
    return containers;
  }

  @Get('/accounts/:accountPath/containers/:containerPath')
  async getContainerByPath(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `accounts/${accountPath}/containers/${containerPath}`;
    const container = await this.gtmService.getContainerByPath(auth, path);
    return container;
  }

  @Get('/accounts/:accountPath/containers/:containerPath/workspaces')
  async listWorkspaces(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `accounts/${accountPath}/containers/${containerPath}`;
    const workspaces = await this.gtmService.getWorkspaces(auth, path);
    return workspaces;
  }

  @Get(
    '/accounts/:accountPath/containers/:containerPath/workspaces/:workspacePath',
  )
  async getWorkspaceByName(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
    @Param('workspacePath') workspacePath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `accounts/${accountPath}/containers/${containerPath}/workspaces/${workspacePath}`;
    const workspace = await this.gtmService.getWorkspaceByPath(auth, path);
    return workspace;
  }
}
