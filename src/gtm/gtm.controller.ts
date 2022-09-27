import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GtmService } from './gtm.service';

// GTM path constants, might subject to change
const ACCOUNT = 'accounts';
const CONTAINER = 'containers';
const WORKSPACE = 'workspaces';
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
    const path = `${ACCOUNT}/${accountPath}`;
    const accounts = await this.gtmService.getAccountByPath(auth, path);
    return accounts;
  }

  @Get('/accounts/:accountPath/containers')
  async listContainers(@Param('accountPath') accountPath: string) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}`;
    const containers = await this.gtmService.getContainers(auth, path);
    return containers;
  }

  @Get('/accounts/:accountPath/containers/:containerPath')
  async getContainerByPath(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}`;
    const container = await this.gtmService.getContainerByPath(auth, path);
    return container;
  }

  @Get('/accounts/:accountPath/containers/:containerPath/workspaces')
  async listWorkspaces(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}`;
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
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}/${WORKSPACE}}/${workspacePath}`;
    const workspace = await this.gtmService.getWorkspaceByPath(auth, path);
    return workspace;
  }

  @Get(
    '/accounts/:accountPath/containers/:containerPath/workspaces/:workspacePath/tags',
  )
  async listTags(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
    @Param('workspacePath') workspacePath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}/${WORKSPACE}/${workspacePath}`;
    const tags = await this.gtmService.getTags(auth, path);
    return tags;
  }

  @Post(
    '/accounts/:accountPath/containers/:containerPath/workspaces/:workspacePath/tags',
  )
  async createTag(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
    @Param('workspacePath') workspacePath: string,
    @Body() tag: any,
  ) {
    // see readme for the simple tag body format
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}/${WORKSPACE}/${workspacePath}`;
    const tags = await this.gtmService.createTag(auth, path, tag);
    return tags;
  }

  @Get(
    '/accounts/:accountPath/containers/:containerPath/workspaces/:workspacePath/triggers',
  )
  async listTriggers(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
    @Param('workspacePath') workspacePath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}/${WORKSPACE}/${workspacePath}`;
    const triggers = await this.gtmService.getTriggers(auth, path);
    return triggers;
  }

  @Get(
    '/accounts/:accountPath/containers/:containerPath/workspaces/:workspacePath/variables',
  )
  async listVariables(
    @Param('accountPath') accountPath: string,
    @Param('containerPath') containerPath: string,
    @Param('workspacePath') workspacePath: string,
  ) {
    const auth = await this.gtmService.authorize();
    const path = `${ACCOUNT}/${accountPath}/${CONTAINER}/${containerPath}/${WORKSPACE}/${workspacePath}`;
    const variables = await this.gtmService.getVariables(auth, path);
    return variables;
  }
}
