// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // Import the AuthService to handle authentication logic
import { AuthDTO } from './auth.dto'; // Import the Data Transfer Object for authentication

// Define the controller and specify the route prefix 'auth'
@Controller('auth')
export class AuthController {
  // Inject AuthService through the constructor to use its methods
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // Method to handle user signup request
  async signUp(@Body() authDTO: AuthDTO): Promise<object> {
    // Call the signUp method from AuthService and return its result
    return this.authService.signUp(authDTO);
  }

  @Post('login')
  // Method to handle user login request
  async login(@Body() authDTO: AuthDTO): Promise<{ accessToken: string }> {
    // Call the login method from AuthService and return the access token
    return this.authService.login(authDTO); 
  }
}
