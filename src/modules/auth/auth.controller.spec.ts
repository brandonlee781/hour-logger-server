import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

describe('AuthController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      imports: [UserModule],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
    })
      .compile()
      .then(compiledModule => (module = compiledModule));
  });

  let controller: AuthController;
  beforeEach(() => {
    controller = module.get(AuthController);
  });

  it('should exist', () => {
    expect(controller).toBeDefined();
  });
});
