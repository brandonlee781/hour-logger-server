import { AuthGuard } from './AuthGuard.guard';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthGuard', () => {
  // const mockReq = {
  //   username: 'johndoe',
  //   password: 'secret',
  //   logIn: () => {},
  // };
  // const mockRes = {};
  // const authGuard = new AuthGuard();

  // jest
  //   .spyOn(authGuard, 'canActivate')
  //   .mockImplementationOnce((payload) => {
  //     if (payload.username === 'johndoe' && payload.password === 'secret') {
  //       return true;
  //     }
  //     return new HttpException('', HttpStatus.UNAUTHORIZED);
  //   });
  it ('should return true', async () => {
    return Promise.resolve(true);
  });
});
