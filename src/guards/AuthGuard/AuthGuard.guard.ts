import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const isAuthenticated = await new Promise<boolean>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (_, payload, err) => {
        if (err) {
          reject(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));
        }
        if (!payload) {
          return resolve(false);
        }

        request.user = payload;
        return resolve(true);
      })(request, response);
    }).catch(err => {
      throw err;
    });
    if (!isAuthenticated) {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
