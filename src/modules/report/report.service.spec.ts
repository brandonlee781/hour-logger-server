import { TestingModule, Test, TestingModuleBuilder } from '@nestjs/testing';
import { User, UserModule } from '../user';
import { Report } from './report.entity';
import { ReportService } from './report.service';
import { LogModule, Log } from '../log';
import { ProjectModule } from '../project';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Faker } from '../shared/Faker';
import * as faker from 'faker';

describe('ReportService', () => {
  let module: TestingModule;
  let service: ReportService;
  // let reports: Report[];
  const user: User = Faker.generateUser();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            find: jest.fn().mockImplementation(async ({where}) => {
              return Faker.generateReports(4, where.user);
            }),
            findOne: jest.fn().mockImplementationOnce(async ({where}) => {
              return Faker.generateReport(1, { id: where.id, user: where.user });
            }),
            save: jest.fn().mockImplementationOnce((obj) => {
              return Faker.generateReport(1, obj);
            }),
            count: jest.fn().mockReturnValueOnce(1),
            // createQueryBuilder: jest.fn(() => ({
            //   offset: jest.fn().mockReturnThis(),
            //   limit: jest.fn().mockReturnThis(),
            // })),
          },
        },
        {
          provide: getRepositoryToken(Log),
          useValue: {
            findByIds: jest.fn().mockImplementationOnce((ids) => ids.map(id => Faker.generateLog(user, null, id))),
          },
        },
      ],
    }).compile();

    service = module.get(ReportService);
    // reports = Faker.generateReports(3);
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports: Report[] = await service.findAll(user);

      expect(reports).toBeDefined();
      expect(reports).toBeInstanceOf(Array);
      expect(reports).toHaveLength(4);
      expect(reports).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            date: expect.any(String),
            type: expect.any(String),
            user: expect.any(Object),
            logs: expect.any(Array),
            data: expect.any(Object),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should return an single report', async () => {
      const report = await service.findOne('1', user);

      expect(report).toBeDefined();
      expect(report).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          date: expect.any(String),
          type: expect.any(String),
          user: expect.any(Object),
          logs: expect.any(Array),
          data: expect.any(Object),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
      expect(report.id).toEqual('1');
    });
  });

  describe('create', () => {
    it('should create a new report', async () => {
      const createReport = {
        date: faker.date.recent().toDateString(),
        type: 'invoice' as 'invoice',
        logs: Faker.generateLogs(4).map(l => l.id),
        data: {
          rate: 25,
        },
      };
      const report = await service.create(createReport, user);

      expect(report).toBeTruthy();
      expect(report.logs).toBeInstanceOf(Array);
      expect(report.user).toEqual(user);
      expect(report.type).toEqual(createReport.type);
      expect(report.data.rate).toEqual(createReport.data.rate);
    });
  });
});