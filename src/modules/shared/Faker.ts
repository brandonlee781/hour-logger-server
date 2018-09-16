import * as faker from 'faker';
import { v4 as uuid } from 'uuid';
import { parse, startOfHour, addHours, format } from 'date-fns';
import { Project } from '../project';
import { User } from '../user';
import { Log } from '../log';
import { Report } from '../report';

export class Faker {
  static generateLog(userDefault?: User, projectDefault?: Project, defaultId?: string): Log {
    const duration = Math.round((Math.random() * 8) + 1);
    const start = startOfHour(faker.date.recent());
    const end = addHours(start, duration);

    return {
      id: defaultId || uuid(),
      start: format(start, 'YYYY-MM-DD HH:mm:ss'),
      end: format(end, 'YYYY-MM-DD HH:mm:ss'),
      duration,
      project: projectDefault || Faker.generateProject(),
      user: userDefault || Faker.generateUser(),
      note: faker.lorem.sentence(),
      createdAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
      updatedAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
    };
  }

  static generateLogs(count: number, userDefault?: User, projectDefault?: Project): Log[] {
    let n = 1;
    const logs = [];

    while (n <= count) {
      logs.push(Faker.generateLog());
      n++;
    }

    return logs;
  }

  static generateUser(): User {
    return {
      email: faker.internet.email(),
      id: uuid(),
      createdAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
      updatedAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
    };
  }

  static generateUsers(count: number): User[] {
    let n = 1;
    const users = [];

    while (n <= count) {
      users.push(Faker.generateUser());
      n++;
    }

    return users;
  }

  static generateProject(): Project {
    return {
      id: uuid(),
      name: faker.internet.domainName(),
      color: faker.internet.color(),
      favorite: true,
      createdAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
      updatedAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
    };
  }

  static generateProjects(count: number): Project[] {
    let n = 1;
    const projects = [];

    while (n <= count) {
      projects.push(Faker.generateProject());
      n++;
    }

    return projects;
  }

  static generateReport(n: number = 1, defaultObject?: any): Report {
    const num = Math.round((Math.random() * 4) + 1);
    const user: User = defaultObject ? defaultObject.user : Faker.generateUser();
    const logs = Faker.generateLogs(num, user);

    return {
        id: defaultObject ? defaultObject.id : uuid(),
        date: format(new Date(), 'YYYY-MM-DD'),
        type: 'invoice',
        user,
        logs,
        data: {
          number: n,
          hours: logs.map(l => l.duration).reduce((a, b) => a + b, 0),
          rate: 25,
        },
        createdAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
        updatedAt: format(new Date(), 'ddd MMM DD YYYY HH:mm:ss ZZ'),
      };
  }

  static generateReports(count: number, user: User = Faker.generateUser()): Report[] {
    let n = 1;
    const reports = [];

    while (n <= count) {
      reports.push(Faker.generateReport(n));
      n++;
    }

    return reports;
  }
}