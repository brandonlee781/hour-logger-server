import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { Log } from '../log';
import { User } from '../user';

interface ReportInput {
  date: string;
  type: 'invoice';
  logs: string[];
  data: {
    rate?: number;
  };
}

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async findAll({ limit = 50, offset = 0 }, user: User): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { user },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string, user: User): Promise<Report> {
    return await this.reportRepository.findOne({
      where: { id, user },
    });
  }

  async findByType(type: ReportInput['type'], { limit = 50, offset = 0 }, user): Promise<Report[]> {
    return await this.reportRepository.find({
      where: {
        user,
        type,
      },
      take: limit,
      skip: offset,
    });
  }

  async create(report: ReportInput, user: User): Promise<Report> {
    const num = await this.reportRepository.count({ type: report.type });
    const logs = await this.logRepository.findByIds(report.logs);
    const newReport = new Report();

    newReport.date = report.date;
    newReport.type = report.type;
    newReport.user = user;
    newReport.logs = logs;
    newReport.data = {
      number: num + 1,
      hours: logs.map(l => +l.duration).reduce((a, b) => a + b, 0),
      rate: report.data.rate,
    };

    return await this.reportRepository.save(newReport);
  }
}