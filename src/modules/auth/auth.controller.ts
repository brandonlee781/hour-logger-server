import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken(@Body() body) {
    return await this.authService.createToken(body);
  }
}
