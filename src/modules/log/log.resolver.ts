import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { Log } from './log.entity';
import { LogService } from './log.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';

@Resolver('Log')
@UseGuards(AuthGuard)
export class LogResolver {
  constructor(private readonly logService: LogService) {}

  @Query('allLogs')
  async allLogs(obj, { options = {} }, ctx, info) {
    const { user } = ctx;
    const logs = await this.logService.findAll(user.id, options);
    return { logs };
  }

  @Query('oneLog')
  async oneLog(obj, args, ctx, info) {
    const { id } = args.input;
    const { user } = ctx;
    const log = await this.logService.findOne(id, user.id);
    return { log };
  }

  @Query('allLogsByProjectName')
  async allLogsByProjectName(obj, { input, options }, ctx, info) {
    const { name } = input;
    const { user } = ctx;
    let logs;

    if (name) {
      logs = await this.logService.findAllByProjectName(name, user.id, options);
    } else {
      logs = await this.logService.findAll(user.id, options);
    }
    return { logs };
  }

  @Query('allLogsByProjectId')
  async allLogsByProjectId(obj, { input, options }, ctx, info) {
    const { id } = input;
    const { user } = ctx;
    let logs;

    if (id) {
      logs = await this.logService.findAllByProjectId(id, user.id, options);
    } else {
      logs = await this.logService.findAll(user.id, options);
    }
    return { logs };
  }

  @Query('allLogsByDates')
  async allLogsByDates(obj, { input, options }, ctx, info) {
    const { start, end, project } = input;
    const { user } = ctx;
    const logs = await this.logService.findAllByDates(
      start,
      end,
      project,
      user.id,
      options,
    );
    return { logs };
  }

  @Mutation()
  async createLog(_, { input: { log } }, { user }) {
    const newLog = await this.logService.createLog(log, user.id);
    return { log: newLog };
  }

  @Mutation()
  async updateLog(_, { input: { id, patch } }, ctx) {
    const { user } = ctx;
    const log = await this.logService.updateLog(id, patch, user.id);
    return { log };
  }

  @Mutation()
  async deleteLog(_, { input: { id } }, ctx) {
    const { user } = ctx;
    const log = await this.logService.deleteLog(id, user.id);
    return { log };
  }
}
