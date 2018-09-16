import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../constants';
import { UserService } from '../user/user.service';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken({ email, password = '' }) {
    const expiresIn = 60 * 60 * 24 * 14, // two weeks
      secretOrKey = JWT_KEY;
    const user = await this.userService.findByEmail(email);
    const isPassValid = await compare(password, user.password);

    if (user && isPassValid) {
      const token = jwt.sign({ email: user.email, id: user.id }, secretOrKey, {
        expiresIn,
      });
      return {
        expires_in: expiresIn,
        access_token: token,
      };
    } else {
      throw new HttpException(
        'Email and Password do not match',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async validateUser(signedUser): Promise<boolean> {
    const { email } = signedUser;
    const user = await this.userService.findByEmail(email);

    if (user) {
      return true;
    }

    return false;
  }
}
