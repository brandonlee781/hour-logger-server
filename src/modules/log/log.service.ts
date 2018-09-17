import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { LOG_REPO_TOKEN, PROJECT_REPO_TOKEN } from '../../constants';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  async findAll(user: User, { limit = 50, offset = 0 }): Promise<Log[]> {
    return await this.logRepository.find({
      where: { user },
      take: limit,
      skip: offset,
      order: {
        start: 'DESC',
      },
    });
  }

  async findOne(id: string, user: User): Promise<Log> {
    return await this.logRepository.findOne({
      where: { id, user },
    });
  }

  async findAllByProjectName(
    name: string,
    user: string,
    { limit = 50, offset = 0 }: { limit?: number, offset?: number },
  ): Promise<Log[]> {
    return await this.logRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.project', 'project')
      .where('project.name = :name', { name })
      .andWhere('log.user_id = :user', { user })
      .limit(limit)
      .offset(offset)
      .orderBy({
        'log.start': 'DESC',
      })
      .getMany();
  }

  async findAllByProjectId(
    id: string,
    user: string,
    { limit = 50, offset = 0 }: { limit?: number, offset?: number },
  ): Promise<Log[]> {
    return await this.logRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.project', 'project')
      .where('project.id = :id', { id })
      .andWhere('log.user_id = :user', { user })
      .limit(limit)
      .offset(offset)
      .orderBy({
        'log.start': 'DESC',
      })
      .getMany();
  }

  async findAllByDates(
    start = '1970-01-01',
    end = '2100-12-12',
    projects = [],
    user: string,
    { limit = 50, offset = 0 }: { limit?: number, offset?: number },
  ): Promise<Log[]> {
    const query = this.logRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.project', 'project')
      .where('log.user_id = :user', { user })
      .andWhere('log.start::date >= :start', { start })
      .andWhere('log.start::date <= :end', { end });

    if (projects && projects.length) {
      query.andWhere('project.id IN (:...projects)', { projects });
    }
    const sql = query.getSql();
    return query
      .orderBy('start', 'ASC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async createLog(newLog: Partial<Log>, userId: string): Promise<Log> {
    const user = await this.userService.findOne(userId);
    const project = await this.projectService.findOne(newLog.project.id, user);

    const log = new Log();
    log.start = newLog.start;
    log.end = newLog.end;
    log.duration = newLog.duration;
    log.project = project;
    log.user = user;
    log.note = newLog.note;

    return await this.logRepository.save(log);
  }

  async updateLog(id, patch, user): Promise<Log> {
    const log = await this.logRepository.findOne({
      where: { id, user },
    });
    const project = await this.projectService.findOne(patch.project, user);

    if (log) {
      log.start = patch.start ? patch.start : log.start;
      log.end = patch.end ? patch.end : log.end;
      log.duration = patch.duration ? patch.duration : log.duration;
      log.project = patch.project ? project : log.project;
      log.note = patch.note ? patch.note : log.note;
      return await this.logRepository.save(log);
    }
    throw new HttpException('Log not found', HttpStatus.NOT_FOUND);
  }

  async deleteLog(id, user): Promise<Log> {
    const log = await this.logRepository.findOne({
      where: { id, user },
    });

    if (log) {
      return await this.logRepository.remove(log);
    }
    throw new HttpException('Log Not Found', HttpStatus.NOT_FOUND);
  }
}
