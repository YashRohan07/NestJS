// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authDTO: AuthDTO): Promise<object> {
    return this.authService.signUp(authDTO);
  }

  @Post('login')
  async login(@Body() authDTO: AuthDTO): Promise<{ accessToken: string }> {
    return this.authService.login(authDTO); 
  }
}
