// src/auth/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Mark the class as injectable so it can be used as a provider in the NestJS dependency injection system
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // Define a class that extends the AuthGuard to handle JWT-based authentication