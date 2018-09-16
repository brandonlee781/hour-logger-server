import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { DontBeAService } from './dontbea.service';
import { dontBeAProviders } from './dontbea.providers';
import { DatabaseModule } from '../database/database.module';

describe('DontbeaService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [DontBeAService, ...dontBeAProviders],
      imports: [DatabaseModule],
    })
      .compile()
      .then(compiledModule => (module = compiledModule));
  });

  let service: DontBeAService;
  beforeEach(() => {
    service = module.get(DontBeAService);
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });
});
