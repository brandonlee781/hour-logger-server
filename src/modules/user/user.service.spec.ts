import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UserService } from './user.service';

describe('UserService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      providers: [UserService],
      imports: [],
    })
      .compile()
      .then(compiledModule => (module = compiledModule));
  });

  let service: UserService;
  beforeEach(() => {
    service = module.get(UserService);
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });
});
