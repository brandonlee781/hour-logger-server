import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UserModule, User } from '../user';
import {
  ProjectService,
  ProjectResolver,
  projectProviders,
  Project,
} from './index';
import { DatabaseModule } from '../database/database.module';

describe('ProjectService', () => {
  let module: TestingModule;
  let service: ProjectService;
  let projects: Project[];
  const user: User = {
    email: 'test@email.com',
    id: '123456',
    createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
    updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule],
      providers: [...projectProviders, ProjectService, ProjectResolver],
    }).compile();
    service = module.get(ProjectService);
    projects = [
      {
        id: '1',
        name: 'daniela.com',
        color: '#D500F9',
        user,
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '2',
        name: 'madison.info',
        color: '#FFEB3B',
        user,
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '3',
        name: 'cassandre.com',
        color: '#03A9F4',
        user,
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
      {
        id: '4',
        name: 'isabel.info',
        color: '#D500F9',
        user: {
          email: 'anotheremail@email.com',
          id: '777fff',
          createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
          updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        },
        createdAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
        updatedAt: 'Mon Mar 05 2018 06:59:44 GMT-0600 (CST)',
      },
    ];
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of all projects belonging to user', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => projects.filter(p => p.user.id === user.id));

      expect(await service.findAll(user.id)).toEqual([
        projects[0],
        projects[1],
        projects[2],
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single project belonging to the user', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(id =>
          projects.find(p => p.id === id && p.user.id === user.id),
        );

      expect(await service.findOne('1', user.id)).toEqual(projects[0]);
    });
  });

  describe('createProject', () => {
    it('should create a new project and return it', async () => {
      const date = new Date().toISOString();
      jest
        .spyOn(service, 'createProject')
        .mockImplementation((name, color, userId) => {
          const newUser = user;
          const newProject = {
            id: '6',
            name,
            color,
            user: newUser,
            createdAt: date,
            updatedAt: date,
          };
          projects.push(newProject);
          return newProject;
        });

      expect(await service.createProject('test', '#111', user.id)).toEqual({
        id: '6',
        name: 'test',
        color: '#111',
        user,
        createdAt: date,
        updatedAt: date,
      });
    });
  });
});
