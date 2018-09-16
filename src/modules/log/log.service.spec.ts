import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { LogService } from './log.service';
import { logProviders } from './log.providers';
import { LogResolver } from './log.resolver';
import { Log } from './log.entity';
import { User } from '../user/user.entity';

describe('LogService', () => {
  let module: TestingModule;
  let service: LogService;
  let logs: Log[];
  const user: User = {
    email: 'test@email.com',
    id: '123456',
    createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
    updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [...logProviders, LogService, LogResolver],
      imports: [DatabaseModule, ProjectModule, UserModule],
    }).compile();
    service = module.get(LogService);
    logs = [
      {
        id: '02473bb7-5e89-41a1-8179-160eeee92043',
        startTime: '08:00:00',
        endTime: '12:00:00',
        date: '2018-02-21',
        duration: 4,
        project: {
          id: '6fad4540-2cd4-4254-aba9-61db73cc12c1',
          name: 'daniela.com',
          color: '#D500F9',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note:
          'Voluptatum a dolore beatae dolores ut exercitationem et explicabo amet.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '4',
        startTime: '08:00:00',
        endTime: '15:00:00',
        date: '2018-02-03',
        duration: 7,
        project: {
          id: 'f8fa8c99-3f4f-4157-80d3-cc2e4e57761d',
          name: 'madison.info',
          color: '#FFEB3B',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note: 'Est ab ex quia nisi nobis accusantium eos aut.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '07cabaaa-6efb-477a-bdf1-c45d2144483d',
        startTime: '14:00:00',
        endTime: '15:00:00',
        date: '2018-02-21',
        duration: 1,
        project: {
          id: '9c052b5b-5e35-4b4e-8f39-b4af6168448c',
          name: 'cassandre.com',
          color: '#03A9F4',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note: 'Qui quia quibusdam facilis est blanditiis praesentium.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '08268dcc-da9e-4cd5-ba7d-789f8a71bb14',
        startTime: '08:00:00',
        endTime: '12:00:00',
        date: '2018-03-01',
        duration: 4,
        project: {
          id: '985961cb-5dbb-42bd-b5c9-62322eaa88f1',
          name: 'isabel.info',
          color: '#D500F9',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note: 'Aut et itaque.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '1e7e575f-4abc-4660-a780-d98068bb77b0',
        startTime: '15:00:00',
        endTime: '16:00:00',
        date: '2018-03-04',
        duration: 1,
        project: {
          id: '985961cb-5dbb-42bd-b5c9-62322eaa88f1',
          name: 'isabel.info',
          color: '#D500F9',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note: 'Dolore modi ab ut et perferendis nihil quas tempore.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '0db640b9-40e0-46b1-95c5-b6bf4ffce6f4',
        startTime: '08:00:00',
        endTime: '15:00:00',
        date: '2018-02-28',
        duration: 7,
        project: {
          id: '9ed94c22-afda-4912-9689-36530dd481a9',
          name: 'efren.com',
          color: '#f44336',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        user,
        note: 'Et cupiditate maxime.',
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
    ];
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of all logs', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => logs);

      expect(await service.findAll(user.id)).toBe(logs);
    });
  });

  describe('findOne', () => {
    it('should return the specified log', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(id => logs.find(l => l.id === id));

      expect(await service.findOne(logs[0].id, user.id)).toBe(logs[0]);
    });
  });

  describe('findAllByProjectName', () => {
    it('should return all logs that belong to the passed project name', async () => {
      jest
        .spyOn(service, 'findAllByProjectName')
        .mockImplementation(name => logs.filter(l => l.project.name === name));

      expect(
        await service.findAllByProjectName(logs[0].project.name, user.id),
      ).toEqual([logs[0]]);
    });
  });

  describe('findAllByProjectId', () => {
    it('should return all logs that belong to passed project id', async () => {
      jest
        .spyOn(service, 'findAllByProjectId')
        .mockImplementation(id => logs.filter(l => l.project.id === id));

      expect(
        await service.findAllByProjectId(logs[4].project.id, user.id),
      ).toEqual([logs[3], logs[4]]);
    });
  });

  describe('findAllByDates', () => {
    it('should return all logs between two passed dates', async () => {
      jest.spyOn(service, 'findAllByDates').mockImplementation((start, end) =>
        logs.filter(l => {
          return (
            new Date(l.date) <= new Date(end) &&
            new Date(l.date) >= new Date(start)
          );
        }),
      );

      expect(
        await service.findAllByDates('2018-03-01', '2018-03-04', null, user.id),
      ).toEqual([logs[3], logs[4]]);
    });

    it('should return all logs from 1970 forward if no start date is passed', async () => {
      jest.spyOn(service, 'findAllByDates').mockImplementation((start, end) =>
        logs.filter(l => {
          return (
            new Date(l.date) <= new Date(end) &&
            new Date(l.date) >= new Date('1970-01-01')
          );
        }),
      );

      expect(
        await service.findAllByDates(null, '2018-02-28', null, user.id),
      ).toEqual([logs[0], logs[1], logs[2], logs[5]]);
    });

    it('should return all logs from start to 2100 if no end date is passed', async () => {
      jest.spyOn(service, 'findAllByDates').mockImplementation((start, end) =>
        logs.filter(l => {
          return (
            new Date(l.date) <= new Date('2100-12-12') &&
            new Date(l.date) >= new Date(start)
          );
        }),
      );

      expect(
        await service.findAllByDates('2018-03-01', null, null, user.id),
      ).toEqual([logs[3], logs[4]]);
    });
  });

  describe('createLog', () => {
    it('should create a new log and return it', async () => {
      const date = new Date().toISOString();
      const inputLog = {
        startTime: '08:00:00',
        endTime: '15:00:00',
        date: '2018-02-28',
        duration: 7,
        project: '9ed94c22-afda-4912-9689-36530dd481a9',
        note: 'Et cupiditate maxime.',
      };
      const projects = [
        {
          id: '9ed94c22-afda-4912-9689-36530dd481a9',
          name: 'efren.com',
          color: '#f44336',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
      ];
      jest.spyOn(service, 'createLog').mockImplementation((newLog, userId) => {
        const log = Object.assign({}, newLog, {
          id: '6',
          createdAt: date,
          updatedAt: date,
          user,
          project: projects.find(p => p.id === newLog.project),
        });
        logs.push(log);
        return log;
      });

      expect(await service.createLog(inputLog, user.id)).toEqual(
        Object.assign({}, inputLog, {
          id: '6',
          createdAt: date,
          updatedAt: date,
          user,
          project: projects.find(p => p.id === inputLog.project),
        }),
      );
    });
  });

  describe('updateLog', () => {
    it('should update the chosen log with the new data', async () => {
      const date = new Date().toISOString();
      jest
        .spyOn(service, 'updateLog')
        .mockImplementation((id, patch, userId) => {
          const logIndex = logs.findIndex(
            l => l.id === id && l.user.id === userId,
          );
          logs[logIndex] = Object.assign({}, logs[logIndex], patch, {
            updatedAt: date,
          });
          return logs[logIndex];
        });

      expect(await service.updateLog('4', { note: 'test' }, user.id)).toEqual(
        Object.assign({}, logs[1], {
          note: 'test',
          updatedAt: date,
        }),
      );
    });
  });

  describe('deleteLog', () => {
    it('should delete the chosen log if it belongs to the user', async () => {
      const oldLog = Object.assign({}, logs[1]);
      jest.spyOn(service, 'deleteLog').mockImplementation((id, userId) => {
        const logIndex = logs.findIndex(
          l => l.id === id && l.user.id === userId,
        );
        const deletedLog = Object.assign({}, logs[logIndex]);
        logs.splice(logIndex, 1);
        return deletedLog;
      });

      expect(await service.deleteLog('4', user.id)).toEqual(oldLog);
      expect(logs).not.toContain(oldLog);
    });
  });
});
