import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { InvoiceService } from './invoice.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule, User } from '../user';
import { InvoiceResolver } from './invoice.resolver';
import { Invoice } from './invoice.entity';
import { LogModule, Log } from '../log';
import { ProjectModule } from '../project';

describe('InvoiceService', () => {
  let module: TestingModule;
  let service: InvoiceService;
  let invoices: Invoice[];
  const user: User = {
    email: 'test@email.com',
    id: '123456',
    createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
    updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
  };
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule, LogModule, ProjectModule],
      providers: [
        InvoiceService,
        InvoiceResolver,
      ],
    }).compile();
    service = module.get(InvoiceService);
    invoices = [
      {
        id: '1',
        number: 7,
        hours: 4,
        rate: 25,
        date: '2018-01-01',
        user,
        logs: [
          {
            id: '48705a0e-a6dc-465d-b9c8-2940d561b7e8',
            startTime: '14:00:00',
            endTime: '15:00:00',
            date: '2018-02-13',
            duration: 1,
            project: {
              id: '985961cb-5dbb-42bd-b5c9-62322eaa88f1',
              name: 'isabel.info',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note:
              'Adipisci voluptatum ut exercitationem autem optio non vitae.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '2bfff93d-ad25-46af-a0b9-906151eaecc1',
            startTime: '08:00:00',
            endTime: '12:00:00',
            date: '2018-02-17',
            duration: 4,
            project: {
              id: '6fad4540-2cd4-4254-aba9-61db73cc12c1',
              name: 'daniela.com',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Non corrupti et et fugiat rerum architecto voluptatem.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '1e4f5e13-811a-4f48-ac5d-80f655d66b11',
            startTime: '15:00:00',
            endTime: '16:00:00',
            date: '2018-02-14',
            duration: 1,
            project: {
              id: '67699045-edcc-493e-a6ab-22969b061ebb',
              name: 'abdullah.name',
              color: '#673AB7',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Vitae est sed eos ipsa ullam.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
        ],
        createdAt: 'Wed Mar 07 2018 11:49:16 GMT-0600 (CST)',
        updatedAt: 'Wed Mar 07 2018 11:49:16 GMT-0600 (CST)',
      },
      {
        id: '2',
        number: 8,
        hours: 4,
        rate: 25,
        date: '2018-01-01',
        user,
        logs: [
          {
            id: '48705a0e-a6dc-465d-b9c8-2940d561b7e8',
            startTime: '14:00:00',
            endTime: '15:00:00',
            date: '2018-02-13',
            duration: 1,
            project: {
              id: '985961cb-5dbb-42bd-b5c9-62322eaa88f1',
              name: 'isabel.info',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note:
              'Adipisci voluptatum ut exercitationem autem optio non vitae.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '2bfff93d-ad25-46af-a0b9-906151eaecc1',
            startTime: '08:00:00',
            endTime: '12:00:00',
            date: '2018-02-17',
            duration: 4,
            project: {
              id: '6fad4540-2cd4-4254-aba9-61db73cc12c1',
              name: 'daniela.com',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Non corrupti et et fugiat rerum architecto voluptatem.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '1e4f5e13-811a-4f48-ac5d-80f655d66b11',
            startTime: '15:00:00',
            endTime: '16:00:00',
            date: '2018-02-14',
            duration: 1,
            project: {
              id: '67699045-edcc-493e-a6ab-22969b061ebb',
              name: 'abdullah.name',
              color: '#673AB7',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Vitae est sed eos ipsa ullam.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
        ],
        createdAt: 'Wed Mar 07 2018 11:49:16 GMT-0600 (CST)',
        updatedAt: 'Wed Mar 07 2018 11:49:16 GMT-0600 (CST)',
      },
      {
        id: '3',
        number: 9,
        hours: 4,
        rate: 25,
        date: '2018-01-01',
        user,
        logs: [
          {
            id: '48705a0e-a6dc-465d-b9c8-2940d561b7e8',
            startTime: '14:00:00',
            endTime: '15:00:00',
            date: '2018-02-13',
            duration: 1,
            project: {
              id: '985961cb-5dbb-42bd-b5c9-62322eaa88f1',
              name: 'isabel.info',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note:
              'Adipisci voluptatum ut exercitationem autem optio non vitae.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '2bfff93d-ad25-46af-a0b9-906151eaecc1',
            startTime: '08:00:00',
            endTime: '12:00:00',
            date: '2018-02-17',
            duration: 4,
            project: {
              id: '6fad4540-2cd4-4254-aba9-61db73cc12c1',
              name: 'daniela.com',
              color: '#D500F9',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Non corrupti et et fugiat rerum architecto voluptatem.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
          {
            id: '1e4f5e13-811a-4f48-ac5d-80f655d66b11',
            startTime: '15:00:00',
            endTime: '16:00:00',
            date: '2018-02-14',
            duration: 1,
            project: {
              id: '67699045-edcc-493e-a6ab-22969b061ebb',
              name: 'abdullah.name',
              color: '#673AB7',
              createdAt: '2018-03-05T12:59:44.245Z',
              updatedAt: '2018-03-05T12:59:44.245Z',
            },
            user,
            note: 'Vitae est sed eos ipsa ullam.',
            createdAt: '2018-03-05T12:59:44.346Z',
            updatedAt: '2018-03-05T12:59:44.346Z',
          },
        ],
        createdAt: 'Wed Mar 07 2018 11:49:17 GMT-0600 (CST)',
        updatedAt: 'Wed Mar 07 2018 11:49:17 GMT-0600 (CST)',
      },
    ];
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of invoices', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => invoices);

      expect(await service.findAll(user.id)).toBe(invoices);
    });
  });

  describe('findOne', () => {
    it('should return a single invoice', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation((id, userId) =>
          invoices.find(i => i.id === id && i.user.id === userId),
        );

      expect(await service.findOne('1', user.id)).toBe(invoices[0]);
    });
  });
});
